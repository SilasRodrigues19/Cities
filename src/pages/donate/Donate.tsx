import { BaseLayoutOfPages } from '../../shared/layouts';
import {
  Button,
  Divider,
  Icon,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Paper,
  useTheme,
} from '@mui/material';

import bg from '../../images/donate.svg';

export const Donate = () => {
  const theme = useTheme();

  return (
    <BaseLayoutOfPages title="Contributions ">
      <Divider variant="middle" sx={{ mx: 2 }} />
      <Card
        sx={{ width: '75%', margin: '30px auto' }}
        component={Paper}
        variant="outlined"
      >
        <CardHeader
          title="Support us"
          sx={{ textAlign: 'center', letterSpacing: '2em !important' }}
        ></CardHeader>
        <Divider variant="middle" sx={{ margin: '10px 0' }} />
        <CardMedia
          sx={{ objectFit: 'contain' }}
          component="img"
          height="194"
          image={bg}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Contributions are what make the open source community such an
            amazing place to learn, inspire, and create. Any contributions you
            make are greatly appreciated.
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button
            sx={{ width: '50rem' }}
            color="primary"
            disableElevation
            variant={theme.palette.mode == 'light' ? 'outlined' : 'contained'}
            startIcon={<Icon sx={{ ml: 1 }}>monetization_on_icon</Icon>}
          >
            <Typography
              variant="button"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              Donate
            </Typography>
          </Button>
          <Button
            sx={{ width: '50rem' }}
            color="primary"
            disableElevation
            variant={theme.palette.mode == 'light' ? 'outlined' : 'contained'}
            startIcon={<Icon sx={{ ml: 1 }}>share_icon</Icon>}
          >
            <Typography
              variant="button"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              Share
            </Typography>
          </Button>
        </CardActions>
      </Card>
    </BaseLayoutOfPages>
  );
};
