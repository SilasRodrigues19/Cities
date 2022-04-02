import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard, ListingPeople } from '../pages';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/home',
        label: 'Home',
      },
      {
        icon: 'supervisor_account',
        path: '/people',
        label: 'People',
      },
      {
        icon: 'apartment',
        path: '/city',
        label: 'Cities',
      },
      {
        icon: 'help',
        path: '/help',
        label: 'Help',
      },
      {
        icon: 'info',
        path: '/info',
        label: 'Info',
      },
      {
        icon: 'volunteer_activism',
        path: '/donate',
        label: 'Donate',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/home" element={<Dashboard />} />
      <Route path="/people" element={<ListingPeople />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
