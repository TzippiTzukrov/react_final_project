import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from '../Context/UserContext';
import { FormProvider } from '../Context/FormContext';
import { ToastProvider } from '../Context/ToastContext';
import ProtectedRoute from './ProtectedRoute';
import RequireAuth from './RequireAuth';

import EntryPage from '../Pages/EntryPage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import HomePage from '../Pages/HomePage';
import InfoPage from '../Pages/InfoPage';
import PostsPage from '../Pages/PostsPage';
import TodosPage from '../Pages/TodosPage';
import UserAlbum from '../Pages/UserAlbum';
import UserAlbumsPhotos from '../Pages/UserAlbumsPhotos';
import NotFoundPage from '../Pages/NotFoundPage';
import ForbiddenPage from '../Pages/ForbiddenPage';
import UnauthorizedPage from '../Pages/UnauthorizedPage';

function AppRouter() {
  return (
    <ToastProvider>
      <UserProvider> 
        <FormProvider> 
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/entry" replace />} />
              
              <Route path="/entry" element={<EntryPage />} />
              <Route path="/login" element={<LoginPage />} /> 
              <Route path="/register/step1" element={<RegisterPage />} /> 
              <Route path="/register/step2" element={<RegisterPage />} /> 
              
              <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} /> 
              
              <Route path="/users/:userId/info" element={<RequireAuth><InfoPage /></RequireAuth>} />
              <Route path="/users/:userId/posts" element={<RequireAuth><PostsPage /></RequireAuth>} /> 
              <Route path="/users/:userId/albums" element={<RequireAuth><UserAlbum /></RequireAuth>} /> 
              <Route path="/users/:userId/albums/:albumid/photos" element={<RequireAuth><UserAlbumsPhotos /></RequireAuth>} /> 
              
              <Route path="/users/:userId/todos" element={<ProtectedRoute><TodosPage /></ProtectedRoute>} />
              
              <Route path="/401" element={<UnauthorizedPage />} />
              <Route path="/403" element={<ForbiddenPage />} />
              
              <Route path="/404" element={<NotFoundPage />} />
              
              <Route path="*" element={<NotFoundPage />} /> 
            </Routes>
          </Router>
        </FormProvider>
      </UserProvider>
    </ToastProvider>
  );
}

export default AppRouter;