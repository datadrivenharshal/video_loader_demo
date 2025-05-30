interface VideoHeaderProps {
  videoName: string;
  dimensions: { width: number; height: number };
}

const VideoHeader: React.FC<VideoHeaderProps> = ({ videoName, dimensions }) => {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow mb-4">
      <div className="text-sm sm:text-base font-medium text-gray-700">
        🎞️ <span className="font-semibold">{videoName}</span>
      </div>
      <div className="text-sm text-gray-600">
        📐 {dimensions.width} × {dimensions.height} px
      </div>
    </div>
  );
};

export default VideoHeader;
