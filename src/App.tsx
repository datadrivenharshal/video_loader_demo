import { useState, useRef, useEffect, useMemo } from "react";
import VideoUploader from "./components/VideoUploader";
import VideoHeader from "./components/VideoHeader";
import VideoPlayer from "./components/VideoPlayer";
import VideoControls from "./components/VideoControls";
import VideoTimeline from "./components/VideoTimeline";

const App: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoDimensions, setVideoDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [totalFrames, setTotalFrames] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fps] = useState(30);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoURL = useMemo(
    () => (videoFile ? URL.createObjectURL(videoFile) : ""),
    [videoFile]
  );

  useEffect(() => {
    const video = videoRef.current;

    if (videoFile && video) {
      const handleLoadedMetadata = () => {
        setDuration(video.duration);
        setVideoDimensions({
          width: video.videoWidth,
          height: video.videoHeight,
        });
        setTotalFrames(Math.floor(video.duration * fps));
      };

      const handleTimeUpdate = () => {
        const newTime = video.currentTime;
        const newFrame = Math.floor(newTime * fps);
        setCurrentTime((prev) =>
          Math.abs(prev - newTime) > 0.05 ? newTime : prev
        );
        setCurrentFrame((prev) => (prev !== newFrame ? newFrame : prev));
      };

      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      video.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [videoFile, fps]);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      isPlaying ? video.pause() : video.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handlePreviousFrame = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = Math.max(0, video.currentTime - 1 / fps);
    }
  };

  const handleNextFrame = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = Math.min(duration, video.currentTime + 1 / fps);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="border-b px-6 py-4 flex items-center justify-between shadow-sm">
        <h1 className="text-lg font-semibold text-gray-800">
          {videoFile ? videoFile.name : "Video Annotation App"}
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-6">
        {!videoFile ? (
          <VideoUploader setVideoFile={setVideoFile} />
        ) : (
          <div className="w-[640px] h-[640px] bg-gray-100 rounded-xl shadow border p-4 flex flex-col justify-between">
            <VideoHeader
              videoName={videoFile.name}
              dimensions={videoDimensions}
            />
            <VideoPlayer videoURL={videoURL} videoRef={videoRef} />
            <VideoControls
              currentTime={currentTime}
              duration={duration}
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              onPreviousFrame={handlePreviousFrame}
              onNextFrame={handleNextFrame}
            />
            <VideoTimeline
              currentFrame={currentFrame}
              totalFrames={totalFrames}
              currentTime={currentTime}
              fps={fps}
              duration={duration}
              onSeek={(time: number) => {
                const video = videoRef.current;
                if (video) {
                  video.currentTime = time;
                }
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
