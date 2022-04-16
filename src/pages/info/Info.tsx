import { BaseLayoutOfPages } from '../../shared/layouts';
import {
  Divider,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Paper,
  useTheme,
} from '@mui/material';

import React from 'react';
import bg from '../../images/about_us.svg';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { TipsAndUpdates, AutoGraph, RocketLaunch } from '@mui/icons-material';

export const Info: React.FC = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BaseLayoutOfPages title="Information">
      <Divider variant="middle" sx={{ mx: 2 }} />
      <Card
        sx={{ width: '75%', margin: '30px auto' }}
        component={Paper}
        variant="outlined"
      >
        <CardHeader title="About US" sx={{ textAlign: 'center' }}></CardHeader>
        <Divider variant="middle" sx={{ margin: '10px 0' }} />
        <CardMedia
          sx={{
            objectFit: 'contain',
            filter: 'drop-shadow(5px 3px 4px #7b1fa2)',
          }}
          component="img"
          height="194"
          image={bg}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Info page.
          </Typography>
        </CardContent>
        <BottomNavigation
          sx={{
            width: 500,
            margin: '60px auto',
            background: theme.palette.mode === 'dark' ? 'transparent' : '',
          }}
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction
            label="Mission"
            value="mission"
            icon={<RocketLaunch />}
          />
          <BottomNavigationAction
            label="Vison"
            value="vision"
            icon={<TipsAndUpdates />}
          />
          <BottomNavigationAction
            label="Values"
            value="values"
            icon={<AutoGraph />}
          />
        </BottomNavigation>
      </Card>
    </BaseLayoutOfPages>
  );
};
