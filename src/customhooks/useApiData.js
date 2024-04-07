import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

const useApiData = (url) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(url);
      setProducts(response.data.products);
      console.log(response.data)
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { products, error, loading, resetError };
};

export default useApiData;
