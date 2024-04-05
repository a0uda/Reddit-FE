export const saveToken = (token: string) => {
  // Store token in local storage
  localStorage.setItem('token', JSON.stringify(token));
};

export const removeToken = () => {
  // Remove token from local storage
  localStorage.removeItem('token');
};
