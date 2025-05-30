interface VideoTimelineProps {
  currentFrame: number;
  totalFrames: number;
  currentTime: number;
  fps: number;
  duration: number;
  onSeek: (time: number) => void;
}

const VideoTimeline: React.FC<VideoTimelineProps> = ({
  currentFrame,
  totalFrames,
  currentTime,
  fps,
  duration,
  onSeek,
}) => {
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    onSeek(newTime);
  };

  return (
    <div className="mt-6">
      {/* Metadata Row */}
      <div className="flex flex-wrap justify-between items-center text-sm sm:text-base mb-2">
        <div className="text-gray-700 font-medium">
          🎬 Frame:{" "}
          <span className="font-semibold">
            {currentFrame} / {totalFrames}
          </span>
        </div>
        <div className="text-gray-700 font-medium">
          ⏱️ Time:{" "}
          <span className="font-semibold">{formatTime(currentTime)}</span>
        </div>
        <div className="text-gray-700 font-medium">
          ⚙️ FPS: <span className="font-semibold">{fps}</span>
        </div>
      </div>

      {/* Timeline Slider */}
      <input
        type="range"
        min={0}
        max={duration}
        step={1 / fps}
        value={currentTime}
        onChange={handleSeek}
        className="w-full accent-blue-600"
      />
    </div>
  );
};

export default VideoTimeline;
