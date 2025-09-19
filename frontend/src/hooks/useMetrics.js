import { useEffect, useState } from 'react';
import { fetchMetrics } from '../services/api';

export default function useMetrics(filters = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchMetrics(filters)
      .then((res) => {
        setData(res.data || []);
        setError(null);
      })
      .catch((e) => {
        setError(e.message);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, [filters.platform, filters.campaign, filters.from, filters.to]);

  return { data, loading, error };
}
