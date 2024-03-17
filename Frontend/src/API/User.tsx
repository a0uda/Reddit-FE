import axios from 'axios';

const baseUrl = 'http://localhost:3000/';
const fetchUser = async (endPoint: string) => {
  return await axios.get(baseUrl + endPoint, {
    withCredentials: false,
    headers: { 'Content-Type': 'application/json' },
  });
};

const patchUser = async ({ newSettings, endPoint }) => {
  try {
    const response = await axios.patch(baseUrl + endPoint, newSettings, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update user settings');
  }
};

export { fetchUser, patchUser };
