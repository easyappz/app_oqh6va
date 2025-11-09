import instance from './axios';

export const registerUser = async (userData) => {
  const response = await instance.post('/api/register/', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await instance.post('/api/login/', credentials);
  return response.data;
};

export const logoutUser = async (refreshToken) => {
  const response = await instance.post('/api/logout/', { refresh: refreshToken });
  return response.data;
};

export const getUserProfile = async () => {
  const response = await instance.get('/api/profile/');
  return response.data;
};

export const updateUserProfile = async (userData) => {
  const response = await instance.put('/api/profile/', userData);
  return response.data;
};
