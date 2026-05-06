import { useUser } from '../Context/UserContext';
import { registerUser, getUserByUsername, loginUser } from "../Services/userService";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function useAuth() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'token' && !e.newValue) {
        setUser(null);
        navigate('/entry', { replace: true });
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  const login = async (formData) => {
    const userData = await loginUser(formData);
    setUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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
    const registeredUser = await registerUser(userData);
    setUser(registeredUser);
    localStorage.setItem("currentUser", JSON.stringify(registeredUser));
    navigate('/home');
  };

  return {
    login,
    logout,
    registerStep1,
    registerStep2
  };
}