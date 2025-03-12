export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const isTokenValid = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode token payload
    const expiry = payload.exp * 1000; // Convert to milliseconds
    return Date.now() < expiry; // Check if token is still valid
  } catch (error) {
    return false;
  }
};

export const checkAuth = (): boolean => {
  const token = getToken();
  return !!token && isTokenValid(token);
};