// client/src/hooks/useApi.js
import { useState, useCallback } from 'react';

const useApi = (apiFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      // Execute the passed API service function
      const result = await apiFunction(...args); 
      setData(result.data); // Assuming Express response structure: { data: { post: {} } }
      return result; // Return the full response for optimistic updates/redirects
    } catch (err) {
      // Axios error handling
      const errorMessage = err.response?.data?.message || err.message || 'An unknown error occurred.';
      setError(errorMessage);
      throw err; // Re-throw for component-level error handling
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  return { data, loading, error, execute, setData };
};

export default useApi;