import React, { useState, useEffect } from 'react';

const EditSpaceModal = ({ isOpen, onClose, onSubmit, space }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('General');

  useEffect(() => {
    if (space) {
      setName(space.name || '');
      setType(space.type || 'General');
    }
  }, [space]);

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit({ name, space_type: type });
    onClose();
  };

  if (!isOpen || !space) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Edit Space</h2>

        <label className="block mb-2 font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
        />

        <label className="block mb-2 font-medium">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
        >
          <option value="General">General</option>
          {/* <option value="Project">Project</option>
          <option value="Personal">Personal</option> */}
        </select>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-600">Cancel</button>
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditSpaceModal;
