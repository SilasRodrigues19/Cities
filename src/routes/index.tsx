import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/pagina-inicial"
        element={
          <Button variant="contained" color="primary">
            Submit
          </Button>
        }
      />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
