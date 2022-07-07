import { BaseLayout } from '../../shared/layouts';
import {
  Divider,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Paper,
  Theme,
  useTheme,
  useMediaQuery,
  Grid,
  Tab,
  Tabs,
  Box,
  styled
} from '@mui/material';

import React from 'react';
import Image from 'material-ui-image';

import aboutImage from '../../images/about_us.svg';
import rocketImage from '../../images/rocket.svg';
import thoughtsImage from '../../images/thoughts.svg';
import smileyImage from '../../images/smiley.svg';

import { motion } from 'framer-motion'
import { TipsAndUpdates, AutoGraph, RocketLaunch } from '@mui/icons-material';
import { useTitle } from '../../shared/hooks';


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

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  font: 'monospace',
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export const Info: React.FC = () => {

  useTitle('Information');

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));


  const smMargin = smDown ? '2px 0' : '';
  const mdBoxShadow = !smDown ? 'none' :
    `2.8px 2.8px 2.2px rgba(0, 0, 0, .02),
    6.7px 6.7px 5.3px rgba(0, 0, 0, .028),
    12.5px 12.5px 10px rgba(0, 0, 0, .035),
    22.3px 22.3px 17.9px rgba(0, 0, 0, .042),
    41.8px 41.8px 33.4px rgba(0, 0, 0, .05),
    100px 100px 80px rgba(0, 0, 0, .07)`;

  const maxW100 = '100%';
  const fw500 = 500;

  return (
    <BaseLayout title="Information">
      <Divider variant="middle" sx={{ mx: 2 }} />

      <Card sx={{ width: '75%', margin: '30px auto' }} component={Paper}>
        <CardHeader title="About US" sx={{ textAlign: 'center' }}></CardHeader>
        <Divider variant="middle" sx={{ margin: '10px 0' }} />
        <motion.div
          animate={{ scale: .9, translateY: -10 }}
          transition={{ duration: 0.5 }}
        >
          <CardMedia
            sx={{
              objectFit: 'contain',
              filter: 'drop-shadow(5px 3px 4px #7b1fa2)',
            }}
            component="img"
            height="194"
            image={aboutImage}
            alt="About Image"
          />
        </motion.div>
        <CardContent>
          <Typography variant="body2" color="text.secondary"></Typography>
        </CardContent>
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
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
            <Paper
              elevation={2}
              sx={{
                width: '90%',
                height: '50%',
                margin: '0 auto',
                padding: '30px 0',
                background: 'transparent',
              }}
            >
              <Typography
                variant="body1"
                color="text.secondary"
                align="center"
                margin="15px 30px"
                paragraph={true}
                fontWeight="bold"
                letterSpacing="2px"
              >
                Our mission is to unite people who are willing to negotiate real
                estate and we seek to be a segment reference in the metropolitan
                region of São Paulo.
              </Typography>
              <Divider variant="middle" sx={{ mx: 2 }} />
              <motion.div
                animate={{ scale: .8, translateY: -10 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={rocketImage}
                  style={{
                    background: 'transparent',
                    width: 'auto',
                    margin: '0 auto',
                    paddingTop: 'calc(35%)',
                  }}
                />
              </motion.div>
            </Paper>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Paper
              elevation={2}
              sx={{
                width: '90%',
                height: '50%',
                margin: '0 auto',
                padding: '30px 0',
                background: 'transparent',
              }}
            >
              <Typography
                variant="body1"
                color="text.secondary"
                align="center"
                margin="15px 30px"
                paragraph={true}
                fontWeight="bold"
                letterSpacing="2px"
              >
                We seek to solve all the bureaucratic part in the search and
                negotiation for the acquisition of a property.
              </Typography>
              <Divider variant="middle" sx={{ mx: 2 }} />
              <motion.div
                animate={{ scale: .8, translateY: -10 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={thoughtsImage}
                  style={{
                    background: 'transparent',
                    width: 'auto',
                    margin: '0 auto',
                    paddingTop: 'calc(35%)',
                  }}
                />
              </motion.div>
            </Paper>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Paper
              elevation={2}
              sx={{
                width: '90%',
                height: '50%',
                margin: '0 auto',
                padding: '30px 0',
                background: 'transparent',
              }}
            >
              <Typography
                variant="body1"
                color="text.secondary"
                align="center"
                margin="15px 30px"
                paragraph={true}
                fontWeight="bold"
                letterSpacing="2px"
              >
                Our values ​​can be summarized in a few principles, the main ones are:
              </Typography>
              <Divider variant="middle" sx={{ mx: 2 }} />
              <Box>
                <Grid
                  container
                  spacing={2}
                  flexDirection={smDown ? 'column' : 'row'}
                  columnGap={smDown ? '2rem' : ''}
                >
                  <Grid item xs={1} sm={12} md={12} lg={8} sx={{ maxWidth: maxW100 }}>
                    <Item sx={{ fontWeight: fw500, margin: smMargin, boxShadow: mdBoxShadow }}>We produce outstanding outcomes</Item>
                  </Grid>
                  <Grid item xs={1} sm={8} md={12} lg={4} sx={{ maxWidth: maxW100 }}>
                    <Item sx={{ fontWeight: fw500, margin: smMargin, boxShadow: mdBoxShadow }}>Transparency</Item>
                  </Grid>
                  <Grid item xs={1} sm={12} md={12} lg={6} sx={{ maxWidth: maxW100 }}>
                    <Item sx={{ fontWeight: fw500, margin: smMargin, boxShadow: mdBoxShadow }}>
                      It's only good for us if it's good for the customer
                    </Item>
                  </Grid>
                  <Grid item xs={1} sm={8} md={12} lg={4} sx={{ maxWidth: maxW100 }}>
                    <Item sx={{ fontWeight: fw500, margin: smMargin, boxShadow: mdBoxShadow }}>Respectful and ethical behavior</Item>
                  </Grid>
                </Grid>
              </Box>
              <motion.div
                animate={{ scale: .8, translateY: -10 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={smileyImage}
                  alt="smiley image"
                  loading="lazy"
                  style={{
                    background: 'transparent',
                    width: 'auto',
                    margin: smDown ? '10px 0' : '0 auto',
                    paddingTop: 'calc(35%)',
                  }}
                />
              </motion.div>
            </Paper>
          </TabPanel>
        </Box>
      </Card>
    </BaseLayout>
  );
};
