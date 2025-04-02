import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { api } from '../api'; // instancia de Axios

const TeamDetails = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [games, setGames] = useState([]);
  const [showGames, setShowGames] = useState(false);
  const [loadingTeam, setLoadingTeam] = useState(true);
  const [loadingGames, setLoadingGames] = useState(false);

  // Obtener información del equipo
  useEffect(() => {
    api.get(`/teams/${id}`)
      .then(res => {
        setTeam(res.data);
        setLoadingTeam(false);
      })
      .catch(err => {
        console.error(err);
        setLoadingTeam(false);
      });
  }, [id]);

  // Obtener juegos cuando se da clic en el logo
  const fetchGames = () => {
    if (!team) return;
    setLoadingGames(true);
    api.get(`/games/team/${team.id}`)
      .then(res => {
        setGames(res.data);
        setShowGames(true);
        setLoadingGames(false);
      })
      .catch(err => {
        console.error(err);
        setLoadingGames(false);
      });
  };

  const localGames = games.filter(g => g.home_team === team?.id);
  const awayGames = games.filter(g => g.visitor_team === team?.id);
  const mergedGames = [
    ...localGames.map(g => ({ ...g, tipo: 'Local' })),
    ...awayGames.map(g => ({ ...g, tipo: 'Visitante' })),
  ];

  const columns = [
    {
      field: 'tipo',
      headerName: 'Tipo',
      width: 110,
    },
    {
      field: 'home_team_name',
      headerName: 'Equipo Local',
      width: 180,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <img src={params.row.home_team_logo} alt={params.value} height={24} />
          <span>{params.value}</span>
        </Box>
      ),
    },
    {
      field: 'visitor_team_name',
      headerName: 'Equipo Visitante',
      width: 180,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <img src={params.row.visitor_team_logo} alt={params.value} height={24} />
          <span>{params.value}</span>
        </Box>
      ),
    },
    {
      field: 'game_date',
      headerName: 'Fecha',
      width: 150,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return isNaN(date.getTime())
          ? 'No disponible'
          : date.toLocaleDateString('es-MX', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
      },
    },
  ];

  if (loadingTeam) return <CircularProgress />;
  if (!team) return <Typography variant="h6">Equipo no encontrado</Typography>;

  return (
    <Box>
      <Typography variant="h4">{team.team_name}</Typography>

      <img
        src={team.team_logo}
        alt={team.team_name}
        style={{ height: 150, margin: '1rem 0', cursor: 'pointer' }}
        onClick={fetchGames}
      />

      <Typography variant="body1">Estadio: {team.stadium}</Typography>

      {loadingGames && (
        <Box mt={3}>
          <CircularProgress />
        </Box>
      )}

      {showGames && (
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Juegos del equipo ({mergedGames.length})
          </Typography>
          <DataGrid
            rows={mergedGames}
            columns={columns}
            autoHeight
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            getRowId={(row) => row.id}
            disableRowSelectionOnClick
          />
        </Box>
      )}
    </Box>
  );
};

export default TeamDetails;
