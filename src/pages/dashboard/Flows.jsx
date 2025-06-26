import React, { useEffect, useRef, useState } from 'react';
import { listSpaces, createSpace, updateSpace, deleteSpace } from '../../nookliApi/spacesApi';
import useSpacesStore from '../../redux/useSpacesStore';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import AddSpaceModal from '../../modal/AddSpaceModal';
import EditSpaceModal from '../../modal/EditSpaceModal';
import { AiFillPushpin, AiOutlinePushpin } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Flows = () => {
  const {
    spaces,
    addSpace,
    updateSpaceInStore,
    removeSpace,
  } = useSpacesStore();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editModal, setEditModal] = useState({ open: false, space: null });

  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchAndMapSpaces = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      try {
        const fetchedSpaces = await listSpaces();
        fetchedSpaces.forEach((space) => {
          const exists = spaces.some((s) => s.space_id === space.id);
          if (!exists) {
            addSpace({
              space_id: space.id,
              name: space.name,
              icon: 'AiOutlineTeam',
              type: space.space_type || 'General',
              members: space.members || [],
              pinned: space.pinned || false,
            });
          }
        });
      } catch (error) {
        toast.error('Failed to fetch spaces');
        console.error('Fetch error:', error);
      }
    };

    fetchAndMapSpaces();
  }, [addSpace, spaces]);

  const handleAddSpace = async (formData) => {
    try {
      const newSpace = await createSpace(formData);
      toast.success('Space created successfully!');
      addSpace({
        space_id: newSpace.id,
        name: newSpace.name,
        icon: 'AiOutlineTeam',
        type: newSpace.space_type || 'General',
        members: newSpace.members || [],
        pinned: newSpace.pinned || false,
      });
    } catch (error) {
      toast.error('Failed to create space');
      console.error(error);
    }
  };

  const handlePinToggle = async (space) => {
    try {
      const newPinned = !space.pinned;

      await updateSpace(space.space_id, { pinned: newPinned });

      updateSpaceInStore(space.space_id, {
        ...space,
        pinned: newPinned,
      });

      toast.success(`Space ${newPinned ? 'pinned' : 'unpinned'}`);
    } catch (error) {
      toast.error('Failed to update pin');
      console.error(error);
    }
  };


  const handleDelete = async (spaceId) => {
    try {
      await deleteSpace(spaceId);
      removeSpace(spaceId);
      toast.success('Space deleted');
    } catch (error) {
      toast.error('Failed to delete space');
      console.error(error);
    }
  };

  const handleEdit = async (updatedData) => {
    try {
      const spaceId = editModal.space.space_id;

      await updateSpace(spaceId, updatedData);

      updateSpaceInStore(spaceId, {
        ...editModal.space,
        name: updatedData.name,
        type: updatedData.space_type,
      });

      toast.success('Space updated successfully!');
    } catch (error) {
      toast.error('Failed to update space');
      console.error(error);
    }
  };


  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">All Spaces</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Add Space
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {spaces.map((space) => (
          <div key={space.space_id} className="bg-white rounded-xl shadow-md p-4 relative">
            <div className="absolute right-3 top-3 flex gap-2 text-gray-500">
              <button onClick={() => handlePinToggle(space)}>
                {space.pinned ? (
                  <AiFillPushpin className="text-yellow-500 hover:text-yellow-600" />
                ) : (
                  <AiOutlinePushpin className="text-gray-400 hover:text-yellow-500" />
                )}
              </button>

              <button onClick={() => setEditModal({ open: true, space })}>
                <FiEdit className="hover:text-blue-600" />
              </button>
              <button onClick={() => handleDelete(space.space_id)}>
                <FiTrash2 className="hover:text-red-600" />
              </button>
            </div>
            <h2 className="text-lg font-semibold">{space.name}</h2>
            <p className="text-gray-600">Type: {space.type}</p>
            <p className="text-gray-500 text-sm">
              Members: {space.members?.join(', ') || 'No members'}
            </p>
            <Link
              to={`/dashboard/spaces/${space.space_id}`}
              className="mt-2 text-sm text-blue-500 underline block"
            >
              Open Space
            </Link>
          </div>
        ))}
      </div>

      {/* Add & Edit Modals */}
      <AddSpaceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddSpace}
      />

      <EditSpaceModal
        isOpen={editModal.open}
        space={editModal.space}
        onClose={() => setEditModal({ open: false, space: null })}
        onSubmit={handleEdit}
      />
    </div>
  );
};

export default Flows;
