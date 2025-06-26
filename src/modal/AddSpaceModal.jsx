import React, { useState } from 'react';

const AddSpaceModal = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('Team');
  const [pinned, setPinned] = useState(false);

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit({ name, space_type: type, pinned });
    setName('');
    setType('Team');
    setPinned(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Create New Space</h2>

        <label className="block mb-2 font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
          placeholder="Enter space name"
        />

        <label className="block mb-2 font-medium">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
        >
          <option value="Team">Team</option>
          <option value="Project">Project</option>
          <option value="Personal">Personal</option>
        </select>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={pinned}
            onChange={(e) => setPinned(e.target.checked)}
            id="pin"
            className="mr-2"
          />
          <label htmlFor="pin">Pin to Quick Access</label>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-600">Cancel</button>
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
        </div>
      </div>
    </div>
  );
};

export default AddSpaceModal;
