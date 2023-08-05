import { useState, useEffect } from 'react';
import Papa from 'papaparse';

const useCSVParser = (filePath) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Papa.parse(filePath, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setData(results.data);
        setLoading(false);
      },
      error: (err) => {
        setError(err);
        setLoading(false);
      },
    });
  }, [filePath]);

  return { data, loading, error };
};

export default useCSVParser;