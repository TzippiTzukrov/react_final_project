import { Navigate } from 'react-router-dom';
import { useUser } from '../Context/UserContext';

function RequireAuth({ children }) {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/401" replace />;
  }

  return children;
}

export default RequireAuth;