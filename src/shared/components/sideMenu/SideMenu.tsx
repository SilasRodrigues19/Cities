import {
  Avatar,
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate, useResolvedPath, useMatch } from 'react-router-dom';
import { useAppThemeContext, useDrawerContext } from '../../contexts';

import Image from '../../../images/logo2.png';

interface IListItemLinkProps {
  to: string;
  label: string;
  icon: string;
  onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({
  to,
  icon,
  label,
  onClick,
}) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export const SideMenu: React.FC = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
  const { toggleTheme } = useAppThemeContext();

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? 'temporary' : 'permanent'}
        onClose={toggleDrawerOpen}
      >
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              sx={{
                height: theme.spacing(12),
                width: theme.spacing(12),
                pointerEvents: 'none',
                filter: theme.palette.mode == 'light' ? 'invert(1)' : '',
              }}
              alt="logo"
              src={Image}
            />
          </Box>
          <Divider variant="middle" sx={{ mx: 2 }} />
          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map(({ path, icon, label }) => (
                <ListItemLink
                  to={path}
                  key={path}
                  icon={icon}
                  label={label}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
            <Divider variant="middle" sx={{ mx: 2 }} />
          </Box>
          <Divider variant="middle" sx={{ mx: 2 }} />
          <Box>
            <List component="nav">
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>
                    {theme.palette.mode == 'dark'
                      ? 'light_mode'
                      : 'nights_stay'}
                  </Icon>
                </ListItemIcon>
                <ListItemText
                  primary={theme.palette.mode == 'dark' ? 'Light' : 'Dark'}
                />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
