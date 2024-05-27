import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../store/store';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { token } = useSelector((state: RootState) => state.auth);
  
    if (!token) {
      // Если пользователь не авторизован, перенаправить на страницу входа
      return <Navigate to="/login" />;
    }
  
    // Если пользователь авторизован, отобразить защищенный контент
    return children;
  };
  
  export default ProtectedRoute;