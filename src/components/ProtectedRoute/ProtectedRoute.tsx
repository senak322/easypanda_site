import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../store/store";
// import { useDispatch } from "react-redux";
import { checkTokenValidity } from "../../store/slices/authSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // const { token } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const { isAuthenticated, tokenChecked } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (!tokenChecked) {
      dispatch(checkTokenValidity());
    }
  }, [dispatch, tokenChecked]);

  if (!tokenChecked) {
    return <div>Loading...</div>; // Показать лоадер, пока проверяется токен
  }

  if (!isAuthenticated) {
    // Если пользователь не авторизован, перенаправить на страницу входа
    return <Navigate to="/login" />;
  }

  // Если пользователь авторизован, отобразить защищенный контент
  return children;
};

export default ProtectedRoute;
