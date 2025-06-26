import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStackById } from '../../../nookliApi/stacksApi'; // adjust path as needed

const StackDetailTab = () => {
  const { spaceId, stackId } = useParams();
  const [stack, setStack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStack = async () => {
      try {
        const data = await getStackById(spaceId, stackId);
        setStack(data);
      } catch (err) {
        setError('Failed to load stack data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (spaceId && stackId) fetchStack();
  }, [spaceId, stackId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Stack Detail</h1>
      <p><strong>ID:</strong> {stack?.id}</p>
      <p><strong>Name:</strong> {stack?.name}</p>
      <p><strong>Description:</strong> {stack?.description}</p>
      {/* Render more fields as needed */}
    </div>
  );
};

export default StackDetailTab;
