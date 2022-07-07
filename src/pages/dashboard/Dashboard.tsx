import { BaseLayout } from '../../shared/layouts';
import { DetailTools } from '../../shared/components';

import { useTheme, Box, SpeedDial, SpeedDialIcon, SpeedDialAction, Grid, Card, CardContent, Typography } from '@mui/material';
import { Info, Help, Apartment, SupervisorAccount, VolunteerActivism } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CitiesService } from '../../shared/services/api/cities/CitiesService';
import { PeopleService } from '../../shared/services/api/people/PeopleService';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { Icon as Loading } from '@iconify/react';

import { useTitle } from '../../shared/hooks';

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

ChartJS.register(ArcElement, Tooltip, Legend);

export const Dashboard = () => {
  const theme = useTheme();

  useTitle('Dashboard');

  const [isCitiesloading, setCitiesIsLoading] = useState(true);
  const [isPeopleloading, setPeopleIsLoading] = useState(true);

  const [totalCitiesCount, setTotalCitiesCount] = useState(0);
  const [totalPeopleCount, setTotalPeopleCount] = useState(0);

  const data = {
    labels: ['Total People', 'Total Cities'],
    datasets: [
      {
        label: '# of Votes',
        data: [totalPeopleCount, totalCitiesCount],
        backgroundColor: [
          '#71c4b6',
          '#4d0b64',
        ],
        borderColor: [
          '#468379',
          '#340345',
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    setCitiesIsLoading(true)
    setPeopleIsLoading(true)

    CitiesService.getAll(1)
      .then((result) => {
        setCitiesIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          return;
        }
        setTotalCitiesCount(result.totalCount);
      });
    PeopleService.getAll(1)
      .then((result) => {
        setPeopleIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          return;
        }
        setTotalPeopleCount(result.totalCount);
      });
  }, [])

  return (
    <BaseLayout
      title="Dashboard"
      toolbar={
        <DetailTools showNewButton={false} showDeleteButton={false} showSaveButton={false} showSaveCloseButton={false} showBackButton={false} />
      }
    >

      <Box width='100%' display='flex'>
        <Grid container margin={2}>
          <Grid item container spacing={2}>

            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>

              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total People
                  </Typography>

                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    {!isPeopleloading && (
                      <Typography variant='h1'>
                        {totalPeopleCount}
                      </Typography>
                    )}
                    {isPeopleloading && (
                      <Typography variant='h6'>
                        <Loading style={{ fontSize: '5rem' }} icon="eos-icons:bubble-loading" />
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>

            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>

              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total Cities
                  </Typography>

                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    {!isCitiesloading && (
                      <Typography variant='h1'>
                        {totalCitiesCount}
                      </Typography>
                    )}
                    {isCitiesloading && (
                      <Typography variant='h6'>
                        <Loading style={{ fontSize: '5rem' }} icon="eos-icons:bubble-loading" />
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>

            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>

              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Chart
                  </Typography>

                  <Box padding={3.6} display='flex' justifyContent='center' alignItems='center'>
                    {!isCitiesloading && !isPeopleloading && (
                      <Doughnut
                        data={data}
                        options={{ maintainAspectRatio: false }}
                      />
                    )}
                    {isCitiesloading && isPeopleloading && (
                      <Typography variant='h6'>
                        <Loading style={{ fontSize: '5rem' }} icon="eos-icons:bubble-loading" />
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>

            </Grid>

          </Grid>
        </Grid>
      </Box>
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
    </BaseLayout>
  );
};
