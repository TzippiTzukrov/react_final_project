import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../Context/UserContext';
import { getUserById } from '../Services/userService';

function ProtectedRoute({ children }) {
  const { userId } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  
  const isTodosPage = location.pathname.includes('/todos');

  useEffect(() => {
    const checkAccess = async () => {
      if (!user) {
        navigate('/401', { replace: true }); 
        return;
      }

      if (isTodosPage && userId) {
        if (userId != user.id) {
          try {
            const targetUser = await getUserById(userId);
            if (!targetUser) {
              navigate('/404');
            } else {
              navigate('/403');
            }
          } catch (error) {
            navigate('/404');
          }
        }
      }
    };

    checkAccess();
  }, [userId, user, navigate, isTodosPage]);

  return children;
}

export default ProtectedRoute;