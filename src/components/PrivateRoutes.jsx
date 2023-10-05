import React from 'react';
import { Outlet, Navigate } from 'react-router';

const PrivateRoutes = () => {
  const user = false;
  return <>{user ? <Outlet /> : <Navigate to="/" />}</>;
};

export default PrivateRoutes;
