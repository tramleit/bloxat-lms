import ReactPlayer from "react-player";

const VideoPlayer = ({ url }) => {
  // Configure the YouTube player to hide branding
  const youtubeConfig = {
    playerVars: {
      modestbranding: 1,
      autoplay: 1, // Autoplay for YouTube
      fs: 0, // Hide fullscreen button for YouTube
    },
  };

  // Configure the Vimeo player to hide branding
  const vimeoConfig = {
    controls: true,
    autoplay: true, // Autoplay for Vimeo
  };

  // Determine the video source type
  const sourceType = url.includes("youtube.com") ? "youtube" : "vimeo";

  return (
    <div className="relative aspect-video">
      <div className="absolute inset-0 flex items-center justify-center bg-transparent lg:h-[15%] md:h-[20%] h-[30%] flex-col gap-y-2 text-secondary"></div>

      <ReactPlayer
        url={url}
        controls={true}
        width="100%"
        height="100%"
        config={sourceType === "youtube" ? youtubeConfig : vimeoConfig}
      />
    </div>
  );
};

export default VideoPlayer;
