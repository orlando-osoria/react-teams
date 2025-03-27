import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get('https://api-teams-production.up.railway.app/teams')
      .then(res => setTeams(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Lista de Equipos</h1>
      <ul>
        {teams.map(team => (
          <li key={team.team_id}>
            <strong>{team.team_name}</strong> – Estadio: {team.team_stadium}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
