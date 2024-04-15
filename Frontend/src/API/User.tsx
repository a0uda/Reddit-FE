import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

//const baseUrl = String(process.env.VITE_BASE_URL);
console.log('baseUrl ', baseUrl);

// const config = {
//   headers: {
//     'Content-Type': 'application/json',
//     authorization: localStorage.getItem('token'),
//   },
//   withCredentials: true,
// };
// console.log(config);

const fetchRequest = async (endPoint: string) => {
  return await axios.get(baseUrl + endPoint, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
    withCredentials: false,
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
    const response = await axios.patch(baseUrl + endPoint, newSettings, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
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

const postRequest = async ({
  endPoint,
  data,
}: {
  endPoint: string;
  data: unknown;
}) => {
  try {
    const response = await axios.post(baseUrl + endPoint, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      withCredentials: false,
    });
    console.log(response, response.headers!.get('Authorization'));

    return {
      ...response.data,
      token: response.headers['authorization'],
    };
  } catch (error) {
    // console.log(error.response);
    const errorMessage =
      typeof error.response === 'object'
        ? JSON.stringify(error.response)
        : error.response;

    throw new Error(errorMessage);
  }
};

export { fetchRequest, patchRequest, postRequest };
