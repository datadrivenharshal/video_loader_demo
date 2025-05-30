type Props = {
  videoURL: string;
  videoRef: React.RefObject<HTMLVideoElement>;
};

const VideoPlayer: React.FC<Props> = ({ videoURL, videoRef }) => {
  return (
    <div
      className="flex justify-center items-center bg-black rounded-lg shadow"
      style={{
        width: "640px",
        height: "640px",
        overflow: "hidden",
        margin: "0 auto",
      }}
    >
      <video
        ref={videoRef}
        src={videoURL}
        preload="metadata"
        controls={false}
        style={{
          width: "640px",
          height: "640px",
          objectFit: "contain",
          backgroundColor: "black",
        }}
      />
    </div>
  );
};

export default VideoPlayer;
