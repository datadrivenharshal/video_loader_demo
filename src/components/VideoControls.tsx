type Props = {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  onPlayPause: () => void;
  onPreviousFrame: () => void;
  onNextFrame: () => void;
};

const VideoControls: React.FC<Props> = ({
  currentTime,
  duration,
  isPlaying,
  onPlayPause,
  onPreviousFrame,
  onNextFrame,
}) => {
  return (
    <div className="flex items-center gap-4 my-4">
      <button onClick={onPreviousFrame}>⏮️</button>
      <button onClick={onPlayPause}>{isPlaying ? "⏸️" : "▶️"}</button>
      <button onClick={onNextFrame}>⏭️</button>
      <span>
        {currentTime.toFixed(2)} / {duration.toFixed(2)} sec
      </span>
    </div>
  );
};

export default VideoControls;
