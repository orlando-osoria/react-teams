import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Teams from './pages/Teams';
import Games from './pages/Games';
import Players from './pages/Players';
import TeamDetails from './pages/TeamDetails';

const App = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:id" element={<TeamDetails />} />  {/* 👈 ESTA RUTA */}
          <Route path="/games" element={<Games />} />
          <Route path="/players" element={<Players />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
