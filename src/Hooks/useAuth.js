import { useUser } from '../Context/UserContext';
import { registerUser, getUserByUsername, loginUser } from "../Services/userService";
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const login = async (formData) => {
    const userData = await loginUser(formData);
    userData.id = userData.id;
    setUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    navigate('/entry', { replace: true });
  };

  const registerStep1 = async (username) => {
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      throw new Error("Username already exists")
    }
    return true;
  };

  const registerStep2 = async (userData) => {
    await registerUser(userData);
    const userFromServer = await getUserByUsername(userData.username);
    userFromServer.id = userFromServer.id;
    setUser(userFromServer);
    localStorage.setItem("currentUser", JSON.stringify(userFromServer));
    navigate('/home');
  };

  return {
    login,
    logout,
    registerStep1,
    registerStep2
  };
}