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

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import React from 'react';
import bg from '../../images/about_us.svg';

import { TipsAndUpdates, AutoGraph, RocketLaunch } from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const Info: React.FC = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
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
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="organization tabs"
              sx={{ gap: '3rem' }}
            >
              <Tab
                sx={{
                  textTransform: 'capitalize',
                }}
                icon={<RocketLaunch />}
                label="Mission"
                {...a11yProps(0)}
              />
              <Tab
                sx={{ textTransform: 'capitalize' }}
                icon={<TipsAndUpdates />}
                label="Vision"
                {...a11yProps(1)}
              />
              <Tab
                sx={{ textTransform: 'capitalize' }}
                icon={<AutoGraph />}
                label="Values"
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            Mission
          </TabPanel>
          <TabPanel value={value} index={1}>
            Vision
          </TabPanel>
          <TabPanel value={value} index={2}>
            Values
          </TabPanel>
        </Box>
      </Card>
    </BaseLayoutOfPages>
  );
};
