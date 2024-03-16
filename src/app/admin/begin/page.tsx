"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";

const AdminStartPage = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [mp3Url, setMp3Url] = useState("");
  const [started, setStarted] = useState(false);
  const [startResponse, setStartResponse] = useState("");

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
      <Input
        type="text"
        placeholder="mp3 url"
        onChange={(e) => {
          setMp3Url(e.target.value);
        }}
      />
      <Button onClick={handleStart} disabled={started}>
        Start
      </Button>
      <audio ref={audioRef} controls loop style={{ pointerEvents: "none" }}>
        <source src={mp3Url} />
      </audio>
      <div>{startResponse}</div>
    </div>
  );
};

export default AdminStartPage;
