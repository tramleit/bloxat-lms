import { useEffect, useRef } from "react";
import videojs from "video.js";
import "videojs-youtube";
import "video.js/dist/video-js.css";

const VideoPlayer = ({ url }) => {
  const videoRef = useRef();

  const isYouTube = url.includes("youtube");
  const isVimeo = url.includes("vimeo");
  // const isEmbed = url.includes("iframe");

  useEffect(() => {
    if (isYouTube) {
      const player = videojs(videoRef.current, {
        techOrder: ["youtube"],
        sources: [{ type: "video/youtube", src: url }],
        controls: true,
        youtube: {
          modestBranding: true,
          showinfo: 0,
        },
      });

      player.on("error", (error) => {
        console.error("Video.js Player Error:", error);
      });

      return () => {
        if (player) {
          player.dispose();
        }
      };
    } else if (isVimeo) {
      // Fetch Vimeo video data using Vimeo API
      fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`)
        .then((response) => response.json())
        .then((data) => {
          // Once the data is fetched, create an iframe and set its source to the Vimeo video URL
          const iframe = document.createElement("iframe");
          iframe.src = data.html.match(/src="([^"]+)"/)[1]; // Extracting the video URL from HTML
          iframe.frameBorder = 0;
          iframe.allow = "autoplay; fullscreen";
          iframe.allowFullscreen = true;
          iframe.width = "100%"; // Set width to 100% to take the full width
          iframe.height = "410"; // Set height to 450 pixels (adjust as needed)

          // Append the iframe to the video container
          videoRef.current.appendChild(iframe);
        })
        .catch((error) => {
          console.error("Error fetching Vimeo video data:", error);
        });
    }
  }, [url]);

  return (
    <div data-vjs-player>
      {isYouTube ? (
        <>
          {/* Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-2xl"></p>
          </div>
          <video ref={videoRef} className="video-js vjs-16-9" />
        </>
      ) : isVimeo ? (
        // Vimeo
        <div ref={videoRef} className="flex w-full" />
      ) : (
        // Embed
        <div
          dangerouslySetInnerHTML={{
            __html: url,
          }}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
