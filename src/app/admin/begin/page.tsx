"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

const AdminStartPage = () => {
  const searchParams = useSearchParams();

  const audioRef = useRef<HTMLAudioElement>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [started, setStarted] = useState(false);
  const [startResponse, setStartResponse] = useState("");

  const mp3Url = searchParams.get("mp3Url") || "";

  const handleStart = async () => {
    console.log("start");
    const res = await fetch(
      `https://shibalab-reincarnation-ws.fly.dev/api/light?id=${videoUrl}`,
    );

    const data = await res.text();
    setStarted(true);
    setStartResponse(data);
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="video url"
        onChange={(e) => {
          setVideoUrl(e.target.value);
        }}
      />
      <Button onClick={handleStart} disabled={started}>
        Start
      </Button>
      <audio
        ref={audioRef}
        controls
        autoPlay
        loop
        style={{ pointerEvents: "none" }}
      >
        {mp3Url !== "" && <source src={`/audios/${mp3Url}`} />}
      </audio>
      <div>{startResponse}</div>
    </div>
  );
};

export default AdminStartPage;
