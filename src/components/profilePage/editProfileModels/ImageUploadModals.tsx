import React, { ChangeEvent } from "react";

interface ImageUploadModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onUpload: () => void;
  setUploadImage: (file: File | null) => void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  title,
  isOpen,
  onClose,
  onUpload,
  setUploadImage,
}) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadImage(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-black">{title}</h2>
        <input
          type="file"
          onChange={handleFileChange}
          className="text-gray-700"
        />
        <div className="mt-4 flex justify-end">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded mr-2 hover:bg-blue-700 transition"
            onClick={onUpload}
          >
            Upload
          </button>
          <button
            onClick={onClose}
            className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-900 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
