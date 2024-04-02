import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;
console.log(baseUrl);

const config = {
  headers: {
    'Content-Type': 'application/json',
    token: localStorage.getItem('token'),
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
    console.log(response);

    return response.data;
  } catch (error) {
    console.log('Error', error.response.data);

    throw new Error(error.response.data);
  }
};

const postRequest = async ({ endPoint, data }) => {
  try {
    console.log('dataaa gowa post request', data);
    console.log('endPoint gowa post request', endPoint);
    console.log('config gowa post request', config);
    console.log('baseUrl gowa post request', baseUrl);
    console.log('fataaaa username', data.username);
    console.log('fataaaa password', data.password);
    const response = await axios.post(baseUrl + endPoint, data, config);
    console.log(response);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export { fetchRequest, patchRequest, postRequest };
