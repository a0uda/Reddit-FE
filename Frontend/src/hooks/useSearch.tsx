// useSearch.js
import axios from 'axios';
import { useState, useEffect } from 'react';

function useSearch(endpoint: string) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      const source = controller.signal;
      try {
        const response = await axios.get(endpoint, {
          signal: source,
        });
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          setError('Request cancelled');
          console.log('Request cancelled:', error.message);
        } else {
          throw error; // Re-throw other errors
        }
      } finally {
        controller.abort(); // Always abort the controller after the request
      }
    };

    fetchData();
    return () => controller.abort(); // Always abort the controller when the component unmounts
  }, [endpoint]); // Re-fetch data when the url changes

  return { data, isLoading, error };
}

export default useSearch;
