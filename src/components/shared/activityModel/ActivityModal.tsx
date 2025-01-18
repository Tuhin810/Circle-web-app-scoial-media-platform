import React from "react";

interface ActivityModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleLogout: () => void;
}

const ActivityModal: React.FC<ActivityModalProps> = ({
  isOpen,
  handleClose,
  handleLogout,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-60"
        onClick={handleClose}
      ></div>

      <div className="relative z-50 bg-gray-900 rounded-lg p-8 w-80 text-white">
        <h3 className="text-lg font-semibold mb-4">Activity</h3>
        <div className="space-y-4">
          <button
            onClick={handleLogout}
            className="w-full py-2 rounded-lg bg-red-600 hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
          <button
            onClick={handleClose}
            className="w-full py-2 rounded-lg bg-gray-700 hover:bg-gray-800 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityModal;
