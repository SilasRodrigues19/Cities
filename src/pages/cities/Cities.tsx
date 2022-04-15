import { BaseLayoutOfPages } from '../../shared/layouts';
import {
  Divider,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Paper,
} from '@mui/material';

import bg from '../../images/city.svg';

export const Cities: React.FC = () => {
  return (
    <BaseLayoutOfPages title="Cities">
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
          sx={{ objectFit: 'contain' }}
          component="img"
          height="194"
          image={bg}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Cities page.
          </Typography>
        </CardContent>
      </Card>
    </BaseLayoutOfPages>
  );
};
