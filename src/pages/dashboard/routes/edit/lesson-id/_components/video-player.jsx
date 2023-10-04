// VideoPlayer.jsx
import { useEffect, useRef } from "react";
import videojs from "video.js";
import "videojs-youtube";
import "video.js/dist/video-js.css";

const VideoPlayer = ({ url }) => {
  const videoRef = useRef();

  useEffect(() => {
    const player = videojs(videoRef.current, {
      techOrder: ["youtube"],
      sources: [{ type: "video/youtube", src: url }],
      controls: true,
      youtube: {
        // Additional YouTube specific options
        modestBranding: true, // Hides the YouTube logo
        showinfo: 0, // Hides video information like title and uploader
      },
    });

    player.on("error", (error) => {
      console.error("Video.js Player Error:", error);
    });

    ["play", "pause", "ended"].forEach((event) => {
      player.on(event, () => {
        console.log(`Video.js Player Event: ${event}`);
      });
    });

    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [url]);

  return (
    <div data-vjs-player>
      {/* Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-white text-2xl"></p>
      </div>
      <video ref={videoRef} className="video-js vjs-16-9" />
    </div>
  );
};

export default VideoPlayer;
