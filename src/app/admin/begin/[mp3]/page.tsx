"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";

type Props = {
  params: {
    mp3: string;
    video: string;
  };
};

const AdminStartPage = ({ params }: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [started, setStarted] = useState(false);
  const [startResponse, setStartResponse] = useState("");

  const mp3Url = params.mp3;
  const videoUrl = params.video;

  const handleStart = async () => {
    console.log("start");
    const res = await fetch(
      `https://shibalab-reincarnation-ws.fly.dev/api/light?id=${videoUrl}`,
    );

    const data = await res.text();
    setStarted(true);
    setStartResponse(data);

    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div>
      <Button onClick={handleStart} disabled={started}>
        Start
      </Button>
      <audio ref={audioRef} controls autoPlay loop>
        {mp3Url !== "" && (
          <source
            src={`${process.env.NEXT_PUBLIC_WS_SERVER_URL}/audios/${mp3Url}`}
          />
        )}
      </audio>
      <div>{startResponse}</div>
    </div>
  );
};

export default AdminStartPage;
