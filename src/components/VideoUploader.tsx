import React, { useCallback } from "react";

interface VideoUploaderProps {
  setVideoFile: (file: File | null) => void;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ setVideoFile }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
    } else {
      alert("Please upload a valid video file.");
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("video/")) {
        setVideoFile(file);
      } else {
        alert("Only video files are supported.");
      }
    },
    [setVideoFile]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="mb-6">
      <label className="block text-lg font-medium mb-2">
        Upload a Video File
      </label>

      {/* Drag and Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="w-full p-6 border-2 border-dashed border-gray-400 rounded-lg text-center cursor-pointer hover:border-blue-500 transition"
      >
        <p className="mb-2 text-sm text-gray-500">
          Drag & drop your video here
        </p>
        <p className="text-sm text-gray-500">or</p>

        {/* File Input */}
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="mt-2 text-sm"
        />
      </div>
    </div>
  );
};

export default VideoUploader;
