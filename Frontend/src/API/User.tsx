import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

//const baseUrl = String(process.env.VITE_BASE_URL);
console.log('baseUrl ', baseUrl);

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
};

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `${token}`;
    return config;
  },
  (error) => {
    console.log('Error', error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    let data = response.data;
    let noStatus = false;

    if (data && typeof data === 'object') {
      if ('success' in data) {
        delete data['success'];
        noStatus = true;
      }
      if ('status' in data) {
        delete data['status'];
        noStatus = true;
      }
      if ('message' in data) {
        delete data['message'];
        noStatus = true;
      }
      if ('msg' in data) {
        delete data['msg'];
        noStatus = true;
      }
    }
    

    if (noStatus) data = Object.values(data)[0]; // Last object in the response
    response.data = data;
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const fetchRequest = async (endPoint: string) => {
  return await axios.get(baseUrl + endPoint, config);
};

const patchRequest = async ({
  newSettings,
  endPoint,
}: {
  newSettings: unknown;
  endPoint: string;
}) => {
  const response = await axios.patch(baseUrl + endPoint, newSettings, config);
  console.log(response);

  return response.data;
};

const postRequest = async ({
  endPoint,
  data,
}: {
  endPoint: string;
  data: unknown;
}) => {
  const response = await axios.post(baseUrl + endPoint, data, config);
  console.log(response);

  return {
    ...response.data,
    token: response.headers['authorization'],
  };
};

export { fetchRequest, patchRequest, postRequest };
