import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

//const baseUrl = String(process.env.VITE_BASE_URL);
console.log('baseUrl ', baseUrl);

const config = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  },
  withCredentials: false,
};
const fetchRequest = async (endPoint: string) => {
  return await axios.get(baseUrl + endPoint, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    },
    withCredentials: false,
  });
};

const patchRequest = async ({ newSettings, endPoint }) => {
  try {
    const response = await axios.patch(baseUrl + endPoint, newSettings, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      withCredentials: false,
    });
    console.log(response);

    return response.data;
  } catch (error) {
    console.log('Error', error.response.data);

    throw new Error(error.response.data);
  }
};

const postRequest = async ({ endPoint, data }) => {
  try {
    const response = await axios.post(baseUrl + endPoint, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      withCredentials: false,
    });
    console.log(response, response.headers!.get('Authorization').slice(7));

    return {
      ...response.data,
      token: response.headers['authorization'].slice(7),
    };
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export { fetchRequest, patchRequest, postRequest };
