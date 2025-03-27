import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Grid, CardMedia } from '@mui/material';

function App() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get('https://api-teams-production.up.railway.app/teams')  // Usa la URL de tu API
      .then(res => setTeams(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom sx={{ mt: 4 }}>
        Lista de Equipos
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {teams.map(team => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={team.team_id}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', boxShadow: 3 }}>
              
              {/* Mostrar el logo del equipo */}
              <CardMedia
                component="img"
                height="160"
                image={team.team_logo}
                alt={team.team_name}
                sx={{ objectFit: 'contain', bgcolor: '#fff', padding: '10px' }}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" color="primary" align="center">{team.team_name}</Typography>
                <Typography variant="body1" align="center">🏟️ {team.team_stadium}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
