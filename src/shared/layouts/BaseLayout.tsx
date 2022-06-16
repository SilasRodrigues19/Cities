import { ReactNode } from 'react';
import {
  Icon,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';

import { useDrawerContext } from '../contexts';
import Background from '../../images/build_background.avif';


interface IBaseLayoutProps {
  title: string;
  toolbar?: ReactNode;
}

export const BaseLayout: React.FC<IBaseLayoutProps> = ({
  children,
  title,
  toolbar,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const theme = useTheme();

  const { toggleDrawerOpen } = useDrawerContext();

 

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}
      sx={{
        "&::before": {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          background: `url(${Background}) no-repeat center / cover`,
          opacity: theme.palette.mode === 'light' ? '.1' : '.02',
          pointerEvents: 'none',
        }
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        padding={1}
        gap={1}
        height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}
        <Typography
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          margin="0 auto"
          variant={smDown ? 'h6' : mdDown ? 'h5' : 'h4'}
        >
          {title}
        </Typography>
      </Box>

      {toolbar && <Box>{toolbar}</Box>}
      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
  );
};
