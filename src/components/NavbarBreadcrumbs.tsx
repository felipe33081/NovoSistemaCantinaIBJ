import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import createThemeWithVars from '@mui/material/styles/createThemeWithVars';
const theme = createThemeWithVars();

const StyledBreadcrumbs = styled(Breadcrumbs)(() => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

export default function NavbarBreadcrumbs({ page, subPage }: { page: string; subPage?: string }) {
  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Typography variant="body1">Início</Typography>
      
      {!subPage &&<Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
        {page}
      </Typography>}
      {subPage &&<Typography variant="body1">
        {page}
      </Typography>}

      {subPage && <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
        {subPage}
      </Typography>}
    </StyledBreadcrumbs>
  );
}