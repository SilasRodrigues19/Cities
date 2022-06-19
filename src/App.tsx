import { BrowserRouter } from 'react-router-dom';
import { AppThemeProvider, AuthProvider, DrawerProvider } from './shared/contexts';

import { Login, SideMenu } from './shared/components';
import { AppRoutes } from './routes';
import './App.css';

export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Login>
          <DrawerProvider>
            <BrowserRouter>
              <SideMenu>
                <AppRoutes />
              </SideMenu>
            </BrowserRouter>
          </DrawerProvider>
        </Login>
      </AppThemeProvider>
    </AuthProvider>
  );
};
