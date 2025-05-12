const SettingsPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-gray-600 hover:text-black">
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <p>Settings content goes here...</p>
      </div>
    </div>
  );
};

export default SettingsPopup;
