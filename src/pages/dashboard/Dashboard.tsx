import { BaseLayoutOfPages } from '../../shared/layouts';
import { DetailTools } from '../../shared/components';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SupervisorAccount from '@mui/icons-material/SupervisorAccount';
import Apartment from '@mui/icons-material/Apartment';
import Info from '@mui/icons-material/Info';
import Help from '@mui/icons-material/Help';
import VolunteerActivism from '@mui/icons-material/VolunteerActivism';

const actions = [
  { icon: <VolunteerActivism />, name: 'Donate' },
  { icon: <Info />, name: 'Info' },
  { icon: <Help />, name: 'Help' },
  { icon: <Apartment />, name: 'Cities' },
  { icon: <SupervisorAccount />, name: 'People' },
];

export const Dashboard = () => {
  return (
    <BaseLayoutOfPages
      title="Dashboard"
      toolbar={
        <DetailTools showNewButton showSaveCloseButton showBackButton={false} />
      }
    >
      <Box
        sx={{
          position: 'absolute',
          bottom: 95,
          right: 45,
          height: 320,
          transform: 'translateZ(0px)',
          flexGrow: 1,
        }}
      >
        <SpeedDial ariaLabel="SpeedDial basic example" icon={<SpeedDialIcon />}>
          {actions.map(({ icon, name }) => (
            <SpeedDialAction key={name} icon={icon} tooltipTitle={name} />
          ))}
        </SpeedDial>
      </Box>
    </BaseLayoutOfPages>
  );
};
