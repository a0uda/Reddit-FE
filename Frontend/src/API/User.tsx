import axios from 'axios';

const baseUrl = 'http://localhost:3000/';
const fetchUser = async (endPoint: string) => {
  return await axios.get(baseUrl + endPoint, {
    withCredentials: false,
    headers: { 'Content-Type': 'application/json' },
  });
};

export { fetchUser };
