import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;
console.log(baseUrl);

const config = {
  headers: {
    'Content-Type': 'application/json',
    // token: localStorage.getItem('token'),
  },
  withCredentials: false,
};

// const api = axios.create({
//   baseURL: baseUrl,
// });

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const fetchRequest = async (endPoint: string) => {
  return await axios.get(baseUrl + endPoint, {
    withCredentials: false,
    headers: { 'Content-Type': 'application/json' },
  });
};

const patchRequest = async ({
  newSettings,
  endPoint,
}: {
  newSettings: unknown;
  endPoint: string;
}) => {
  try {
    const response = await axios.patch(baseUrl + endPoint, newSettings, config);
    console.log(response);

    return response.data;
  } catch (error) {
    console.log('Error', error.response.data);

    throw new Error(error.response.data);
  }
};

const postRequest = async ({
  endPoint,
  data,
}: {
  endPoint: string;
  data: unknown;
}) => {
  try {
    const response = await axios.post(baseUrl + endPoint, data, config);
    console.log(response);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export { fetchRequest, patchRequest, postRequest };
