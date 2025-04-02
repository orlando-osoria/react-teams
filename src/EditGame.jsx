import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

function EditGame() {
  const { gameId } = useParams();
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Obtener datos del partido
  useEffect(() => {
    axios
      .get(`https://api-teams-production.up.railway.app/games/${gameId}`)
      .then(response => {
        setGameData(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Error al obtener los datos del partido.');
        setLoading(false);
      });
  }, [gameId]);

  // Manejar los cambios en los campos del formulario
  const handleChange = e => {
    const { name, value } = e.target;
    setGameData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Enviar actualización al servidor
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`https://api-teams-production.up.railway.app/games/${gameId}`, gameData)
      .then(response => {
        // Se actualizó el partido, redireccionamos o mostramos un mensaje de éxito
        navigate(-1); // vuelve a la página anterior
      })
      .catch(err => {
        console.error(err);
        setError('Error al actualizar el partido.');
      });
  };

  if (loading) return <Typography>Cargando datos del partido...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom sx={{ mt: 4 }}>
        Actualizar Resultados del Partido
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        {/* Se muestran los puntajes actuales y se permiten actualizar */}
        <TextField
          label="Puntaje Visitante"
          name="visitor_score"
          type="number"
          value={gameData.visitor_score}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Puntaje Local"
          name="home_score"
          type="number"
          value={gameData.home_score}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Actualizar
        </Button>
      </Box>
    </Container>
  );
}

export default EditGame;
