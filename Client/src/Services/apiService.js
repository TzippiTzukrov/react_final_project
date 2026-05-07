const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const getAuthToken = () => localStorage.getItem('token');

const getHeaders = () => {
  const headers = { "Content-Type": "application/json" };
  const token = getAuthToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

const handleResponse = async (response) => {
  if (response.ok) return response.json();
  const error = new Error();
  error.status = response.status;
  try {
    const body = await response.json();
    error.message = body.message || body.error || "Something went wrong";
  } catch {
    error.message = "Something went wrong";
  }
  throw error;
};

export const get = async (endpoint) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, { headers: getHeaders() });
  return handleResponse(response);
};

export const post = async (endpoint, data) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data)
  });
  return handleResponse(response);
};

export const postPublic = async (endpoint, data) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return handleResponse(response);
};

export const patch = async (endpoint, data) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(data)
  });
  return handleResponse(response);
};

export const del = async (endpoint) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "DELETE",
    headers: getHeaders()
  });
  if (!response.ok) return handleResponse(response);
  return true;
};
