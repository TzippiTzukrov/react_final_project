import { apiService } from './apiService';

export const updateUser = (userId, userData) => {
  return apiService.patch(`/users/${userId}`, userData);
};