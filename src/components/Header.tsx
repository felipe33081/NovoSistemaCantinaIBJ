import * as React from 'react';
import Stack from '@mui/material/Stack';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import CustomDatePicker from './CustomDatePicker';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';
import MenuButton from './MenuButton';
import ColorModeIconDropdown from '.././theme/ColorModeIconDropdown';

import Search from './Search';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const getPageInfo = () => {
      const pathParts = location.pathname.split('/').filter(Boolean);
      return {
          page: pathParts[0]?.charAt(0).toUpperCase() + pathParts[0]?.slice(1),
          subPage: pathParts[1]?.charAt(0).toUpperCase() + pathParts[1]?.slice(1),
      };
  };

  const { page, subPage } = getPageInfo();

  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 1.5,
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs page={page} subPage={subPage} />
      <Stack direction="row" sx={{ gap: 1 }}>
        <CustomDatePicker />
        <MenuButton showBadge aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </MenuButton>
        <ColorModeIconDropdown />
      </Stack>
    </Stack>
  );
}
