import axios from 'axios';

const baseUrl = 'http://localhost:3000/';
const fetchUser = (endPoint: string) => {
  return axios.get(baseUrl + endPoint, { withCredentials: true });
};

export { fetchUser };
