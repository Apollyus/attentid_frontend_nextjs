import { useState, useEffect } from 'react';

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer'; // Example roles
  addedDate: string;
  lastActive: string;
}

const useDemoApi = (shouldFetch: boolean = true) => {
  const [data, setData] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!shouldFetch) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay

        // Simulate API response with User data
        const mockUserData: User[] = Array.from({ length: 55 }, (_, i) => {
          const added = new Date(2023, 0, 15 + i); // Stagger added dates
          const lastActive = new Date(added.getTime() + Math.random() * 60 * 24 * 60 * 60 * 1000); // Random last active within 60 days of added
          return {
            id: `user-${i + 1}`,
            name: `User ${i + 1}`,
            email: `user${i + 1}@example.com`,
            role: i % 3 === 0 ? 'Admin' : i % 3 === 1 ? 'Editor' : 'Viewer',
            addedDate: added.toISOString().split('T')[0], // YYYY-MM-DD
            lastActive: lastActive.toISOString().split('T')[0], // YYYY-MM-DD
          };
        });
        setData(mockUserData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [shouldFetch]);

  return { data, loading, error };
};

export default useDemoApi;