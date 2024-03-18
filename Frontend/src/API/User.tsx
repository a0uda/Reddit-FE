import axios from 'axios';

const baseUrl = 'http://localhost:3000/';
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
};
const fetchRequest = async (endPoint: string) => {
  return await axios.get(baseUrl + endPoint, {
    withCredentials: false,
    headers: { 'Content-Type': 'application/json' },
  });
};

const patchRequest = async ({ newSettings, endPoint }) => {
  try {
    const response = await axios.patch(baseUrl + endPoint, newSettings, config);
    return response.data;
  } catch (error) {
    throw new Error('Failed to Update User Settings');
  }
};

const postRequest = async ({ endPoint, data }) => {
  try {
    const response = await axios.post(baseUrl + endPoint, data, config);
    console.log(response);

    return response.data;
  } catch (error) {
    throw new Error('Failed to Update');
  }
};

export { fetchRequest, patchRequest, postRequest };
