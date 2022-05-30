import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import {
  Dashboard,
  ListingPeople,
  PeopleDetail,
  ListingCities,
  CitiesDetail,
  Cities,
  Help,
  Info,
  Donate,
} from '../pages';

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
        path: '/cities',
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
      <Route path="/people/details/:id" element={<PeopleDetail />} />
      <Route path="/cities" element={<ListingCities />} />
      <Route path="/cities/details/:id" element={<CitiesDetail />} />
      <Route path="/cities" element={<Cities />} />
      <Route path="/help" element={<Help />} />
      <Route path="/info" element={<Info />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
