import axios from 'axios';

const baseUrl = process.env.VITE_BASE_URL;

//const baseUrl = String(process.env.VITE_BASE_URL);
console.log('baseUrl ', baseUrl);

axios.defaults.baseURL = baseUrl;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `${token}`;
    return config;
  },
  (error) => {
    console.log('Error interceptor', error);
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
    // if (data.content != undefined) {
    //   response.data = data.content;
    // }
    console.log(response, 'da response');

    if (noStatus) data = Object.values(data)[0]; // Last object in the response
    if (data == undefined) data = 'ok';
    response.data = data;
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const fetchRequest = async (endPoint: string) => {
  try {
    const response = await axios.get(baseUrl + endPoint, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      withCredentials: false,
    });
    console.log(response);

    return response;
  } catch (error) {
    // console.log(error, 'patchhh');
    // const errorMessage =
    //   typeof error.response === 'object'
    //     ? JSON.stringify(error.response)
    //     : error.response;
    const errorMessage =
      error.response?.data?.err?.message ||
      error.response?.data?.error?.message ||
      'Unknown error';
    return Promise.reject(errorMessage);

    // throw new Error(errorMessage);
  }
};

const patchRequest = async ({
  newSettings,
  endPoint,
}: {
  newSettings: unknown;
  endPoint: string;
}) => {
  try {
    const response = await axios.patch(endPoint, newSettings, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      withCredentials: false,
    });
    console.log(response);

    return response.data;
  } catch (error) {
    // console.log(error, 'patchhh');
    // const errorMessage =
    //   typeof error.response === 'object'
    //     ? JSON.stringify(error.response)
    //     : error.response;
    const errorMessage =
      error.response?.data?.err?.message ||
      error.response?.data?.error?.message ||
      'Unknown error';
    return Promise.reject(errorMessage);

    // throw new Error(errorMessage);
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
    const response = await axios.post(endPoint, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      withCredentials: false,
    });
    // console.log(response, response.headers!.get('Authorization'));
    console.log(response, 'reemresponse');
    return {
      ...response.data,
      token: response.headers['authorization'],
    };
  } catch (error) {
    // console.log(error, 'posttt');
    // const errorMessage =
    //   typeof error.response === 'object'
    //     ? JSON.stringify(error.response)
    //     : error.response;
    const errorMessage =
      error.response?.data?.err?.message ||
      error.response?.data?.error?.message ||
      'Unknown error';
    return Promise.reject(errorMessage);
    // return Promise.reject(error.response.data.err.message);

    // throw new Error(errorMessage);
  }
};

const postRequestnew = async ({
  endPoint,
  data,
}: {
  endPoint: string;
  data: unknown;
}) => {
  try {
    const response = await axios.post(endPoint, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      withCredentials: false,
    });
    // console.log(response, response.headers!.get('Authorization'));
    console.log(response, 'reemresponse');
    return {
      data: response.data,
      token: response.headers['authorization'],
    };
  } catch (error) {
    // console.log(error, 'posttt');
    // const errorMessage =
    //   typeof error.response === 'object'
    //     ? JSON.stringify(error.response)
    //     : error.response;
    if (error instanceof AxiosError) {
      const errorMessage =
        error.response?.data?.err?.message ||
        error.response?.data?.error?.message ||
        'Unknown error';
      return Promise.reject(errorMessage);
    }
    // return Promise.reject(error.response.data.err.message);

    // throw new Error(errorMessage);
  }
};

export { fetchRequest, patchRequest, postRequest, postRequestnew };
