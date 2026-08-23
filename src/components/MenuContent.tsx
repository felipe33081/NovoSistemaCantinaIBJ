import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const mainListItems = [
  { text: 'Painel', route: '/painel', page: 0, icon: <HomeRoundedIcon /> },
  { text: 'Pedidos', route: '/pedido', page: 1, icon: <ListAltRoundedIcon /> },
  { text: 'Clientes', route: '/cliente', page: 2, icon: <GroupRoundedIcon /> },
  { text: 'Produtos', route: '/produto', page: 3, icon: <Inventory2RoundedIcon /> },
];

export default function MenuContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const currentPage = mainListItems.findIndex((item) => item.route === location.pathname);
    setSelected(currentPage >= 0 ? currentPage : null);
  }, [location.pathname]);

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={() => {
                setSelected(item.page);
                navigate(item.route);
              }}
              selected={selected === item.page}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
