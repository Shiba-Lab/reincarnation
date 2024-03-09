"use client";

import { Button } from "@/components/ui/button";
import { useRef } from "react";

type Props = {
  params: {
    name: string;
  };
};

const UploadedMoviePage = ({ params }: Props) => {
  const videoElement = useRef(null);

  return (
    <div>
      <video ref={videoElement} loop>
        <source
          src={`https://shibalab-reincarnation-r2.shogo0x2e.com/${params.name}`}
        />
      </video>
      <Button
        onClick={() => {
          if (!videoElement.current) return;
          const video = videoElement.current as HTMLVideoElement;
          video.play();
        }}
      ></Button>
    </div>
  );
};

export default UploadedMoviePage;
