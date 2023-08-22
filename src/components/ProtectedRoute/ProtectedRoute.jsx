import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component, loggedIn }) => {
  return loggedIn ? component : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
