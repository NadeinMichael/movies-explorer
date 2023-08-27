import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import AppContext from '../../contexts/AppContext';

const ProtectedRoute = ({ component }) => {
  const { loggedIn } = useContext(AppContext);
  return loggedIn ? component : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
