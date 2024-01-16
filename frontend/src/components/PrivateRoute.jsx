import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom';

export const PrivateRoute = () => {
  const {usreInfo} = useSelector((state) => state.auth);

  return  usreInfo ? <Outlet /> : <Navigate to="/login" replace/>;
}
