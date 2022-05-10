import { BaseLayoutOfPages } from '../../shared/layouts';
import { DetailTools } from '../../shared/components';

import { useTheme, Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import SupervisorAccount from '@mui/icons-material/SupervisorAccount';
import Apartment from '@mui/icons-material/Apartment';
import Info from '@mui/icons-material/Info';
import Help from '@mui/icons-material/Help';
import VolunteerActivism from '@mui/icons-material/VolunteerActivism';
import { Link } from 'react-router-dom';


const navigateTo: any = (to: string, children: string) => (
  <Link to={to}>{children}</Link>
);

const actions = [
  { icon: navigateTo('/donate', <VolunteerActivism />), name: 'Donate' },
  { icon: navigateTo('/info', <Info />), name: 'Info' },
  { icon: navigateTo('/help', <Help />), name: 'Help' },
  { icon: navigateTo('/cities', <Apartment />), name: 'Cities' },
  { icon: navigateTo('/people', <SupervisorAccount />), name: 'People' },
];

export const Dashboard = () => {
  const theme = useTheme();

  return (
    <BaseLayoutOfPages
      title="Dashboard"
      toolbar={
        <DetailTools showNewButton showSaveCloseButton showBackButton={false} />
      }
    >
      <Box
        sx={{
          position: 'fixed',
          bottom: 95,
          right: 45,
          height: 320,
          transform: 'translateZ(0px)',
          flexGrow: 1,
        }}
      >
        <SpeedDial ariaLabel="SpeedDial" icon={<SpeedDialIcon />}>
          {actions.map(({ icon, name }) => (
            <SpeedDialAction
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                background: theme.palette.mode === 'dark' ? '#cacaca' : '',
                '&:hover': {
                  background: theme.palette.mode === 'dark' ? '#a2a2a2' : '',
                },
              }}
              key={name}
              icon={icon}
              tooltipTitle={name}
            />
          ))}
        </SpeedDial>
      </Box>
    </BaseLayoutOfPages>
  );
};
