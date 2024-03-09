"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  params: {
    name: string;
  };
};

const UploadedMoviePage = ({ params }: Props) => {
  const videoElement = useRef(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!videoElement.current) return;

    const video = videoElement.current as HTMLVideoElement;

    const handleDurationChange = () => {
      setDuration(video.duration);
    };

    video.addEventListener("durationchange", handleDurationChange);

    return () => {
      video.removeEventListener("durationchange", handleDurationChange);
    };
  }, []);

  return (
    <div>
      <video ref={videoElement} autoPlay loop>
        <source
          src={`https://shibalab-reincarnation-r2.shogo0x2e.com/${params.name}`}
        />
      </video>
      <p>Video Duration: {duration} sec</p>
    </div>
  );
};

export default UploadedMoviePage;
