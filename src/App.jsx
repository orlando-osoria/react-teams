import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';

function App() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get('https://api-teams-production.up.railway.app/teams')  
      .then(res => setTeams(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom sx={{ mt: 4 }}>
        Lista de Equipos
      </Typography>

      <Grid container spacing={3}>
        {teams.map(team => (
          <Grid item xs={12} sm={6} md={4} key={team.team_id}>
            <Card sx={{ bgcolor: '#f5f5f5', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" color="primary">{team.team_name}</Typography>
                <Typography variant="body1">🏟️ Estadio: {team.team_stadium}</Typography>
                <Typography variant="body2" color="textSecondary">ID: {team.team_id}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
