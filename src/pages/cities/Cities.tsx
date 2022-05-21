import { BaseLayout } from '../../shared/layouts';
import {
  Divider,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Paper,
} from '@mui/material';

import cityImage from '../../images/city.svg';

export const Cities: React.FC = () => {
  return (
    <BaseLayout title="Cities">
      <Divider variant="middle" sx={{ mx: 2 }} />
      <Card
        sx={{ width: '75%', margin: '30px auto' }}
        component={Paper}
        variant="outlined"
      >
        <CardHeader
          title="Apartments"
          sx={{ textAlign: 'center' }}
        ></CardHeader>
        <Divider variant="middle" sx={{ margin: '10px 0' }} />
        <CardMedia
          sx={{
            objectFit: 'contain',
            filter: 'drop-shadow(5px 3px 4px #7b1fa2)',
          }}
          component="img"
          height="194"
          image={cityImage}
          alt="City Image"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Cities page.
          </Typography>
        </CardContent>
      </Card>
    </BaseLayout>
  );
};
