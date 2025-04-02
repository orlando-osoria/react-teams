import { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardActionArea, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/teams')
      .then(res => {
        setTeams(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <>
      <Typography variant="h4" gutterBottom>Equipos de la MLB</Typography>
      <Grid container spacing={2}>
        {teams.map((team) => (
          <Grid item xs={12} sm={6} md={3} key={team.id}>
            <Card>
              <CardActionArea onClick={() => navigate(`/teams/${team.id}`)}>
                <CardMedia
                  component="img"
                  image={team.team_logo}
                  alt={team.team_name}
                  sx={{ height: 140, objectFit: 'contain', p: 2 }}
                />
                <Typography align="center" sx={{ p: 1 }}>{team.team_name}</Typography>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Teams;
