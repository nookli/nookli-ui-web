import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPathById } from '../../../nookliApi/pathsApi';

const PathDetail = () => {
  const { spaceId, stackId, pathId } = useParams();
  const [path, setPath] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPath = async () => {
      try {
        const res = await getPathById(spaceId, stackId, pathId);
        setPath(res.data);
      } catch (err) {
        console.error('Failed to fetch path', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPath();
  }, [spaceId, stackId, pathId]);

  if (loading) return <p>Loading...</p>;
  if (!path) return <p>Path not found</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Path Detail</h1>
      <p><strong>Name:</strong> {path.name}</p>
      <p><strong>ID:</strong> {path.id}</p>
      {/* Add more fields if needed */}
    </div>
  );
};

export default PathDetail;
