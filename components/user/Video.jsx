"use client";

import { useState } from "react";

const Video = () => {
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <div className="container p-8 mx-auto xl:px-0">
        
      <div className="w-full max-w-4xl mx-auto overflow-hidden lg:mb-20 rounded-2xl">
      <h1 className= "text-3xl font-semibold text-gray-900 dark:text-white text-center mb-4">Explore our Kitchen</h1>
        <video
          width="100%"
          height="500"
          controls
          autoPlay
          muted
          loop
          onPlay={() => setPlayVideo(true)}
          onPause={() => setPlayVideo(false)}
        >
          <source src="./pizza1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Video;
