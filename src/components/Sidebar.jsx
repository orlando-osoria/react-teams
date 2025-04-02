import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Teams', path: '/teams' },
    { text: 'Games', path: '/games' },
    { text: 'Players', path: '/players' },
  ];

  return (
    <Drawer variant="permanent" anchor="left" sx={{ width: 200 }}>
      <List sx={{ width: 200 }}>
        {menuItems.map(({ text, path }) => (
          <ListItem button component={Link} to={path} key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
