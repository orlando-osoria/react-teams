import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  CircularProgress,
  Select,
  MenuItem,
} from '@mui/material';
import { api } from '../api';

const Games = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/teams')
      .then(res => setTeams(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (!selectedTeam) return;

    setLoading(true);
    api.get(`/games/team/${selectedTeam}`)
      .then(res => {
        setGames(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [selectedTeam]);

  // Agrupar juegos por mes
  const groupedGames = games.reduce((acc, game) => {
    const date = new Date(game.game_date);
    const monthKey = date.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
    });

    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }
    acc[monthKey].push(game);
    return acc;
  }, {});

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Partidos por Mes</Typography>

      <Select
        value={selectedTeam}
        onChange={(e) => setSelectedTeam(e.target.value)}
        displayEmpty
        fullWidth
        sx={{ mb: 3 }}
        renderValue={(selected) => {
          if (!selected) return 'Selecciona un equipo';
          const team = teams.find(t => t.id === selected);
          return (
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar
                src={team?.team_logo || `https://placehold.co/24x24?text=${team?.team_name?.charAt(0)}`}
                sx={{ width: 24, height: 24 }}
              />
              <Typography>{team?.team_name}</Typography>
            </Box>
          );
        }}
      >
        <MenuItem value="">
          <em>Selecciona un equipo</em>
        </MenuItem>
        {teams.map((team) => (
          <MenuItem key={team.id} value={team.id}>
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar
                src={team.team_logo || `https://placehold.co/24x24?text=${team.team_name.charAt(0)}`}
                sx={{ width: 24, height: 24 }}
              />
              <Typography>{team.team_name}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>

      {loading && <CircularProgress />}

      {!loading && selectedTeam && (
        <Box>
          {Object.entries(groupedGames).map(([month, gamesInMonth]) => (
            <Box key={month} mb={4}>
              <Typography variant="h5" gutterBottom>{month}</Typography>
              {gamesInMonth.map((game) => {
                const homeTeam = teams.find(t => t.id === game.home_team);
                const visitorTeam = teams.find(t => t.id === game.visitor_team);
                const gameDate = new Date(game.game_date).toLocaleDateString('es-MX', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                });

                return (
                  <Box
                    key={game.id}
                    display="flex"
                    alignItems="center"
                    gap={2}
                    mb={2}
                    p={1}
                    border="1px solid #ccc"
                    borderRadius="8px"
                  >
                    <Avatar src={homeTeam?.team_logo} alt={homeTeam?.team_name} sx={{ width: 32, height: 32 }} />
                    <Typography>{game.home_team_name} vs {game.visitor_team_name}</Typography>
                    <Avatar src={visitorTeam?.team_logo} alt={visitorTeam?.team_name} sx={{ width: 32, height: 32 }} />
                    <Typography sx={{ marginLeft: 'auto', fontSize: '0.9rem' }}>{gameDate}</Typography>
                  </Box>
                );
              })}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Games;
