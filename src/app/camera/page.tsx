"use client";

import { useRef, useState } from "react";

const CameraPage = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [shuttered, setShuttered] = useState(false);

  const onShutterButtonClick = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }

    fetch("https://shibalab-reincarnation-ws.fly.dev/api/shutter");
    setShuttered(true);
  };

  return (
    <div className="w-full flex justify-between">
      <div className="bg-black min-h-screen px-6 flex items-center">
        <div className="rounded-full h-10 w-10 bg-black flex justify-center items-center"></div>
      </div>
      <div className="bg-black min-h-screen px-6 flex items-center">
        <div className="rounded-full h-10 w-10 bg-white flex justify-center items-center">
          <button onClick={onShutterButtonClick} disabled={shuttered}>
            <CameraIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
      <audio ref={audioRef}>
        <source src="/shutter-se.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

function CameraIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

export default CameraPage;
