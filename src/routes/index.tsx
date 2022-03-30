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
        icon: 'people',
        path: '/people',
        label: 'People',
      },
      {
        icon: 'location_city',
        path: '/city',
        label: 'Cities',
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
