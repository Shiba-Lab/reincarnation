"use client";
import { socket } from "@/lib/socket";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

type status = "ready" | "processing" | "done";

type VideoStatus = {
  id: string;
  filename: string;
  imageUrl?: string;
  createdAt: Date;
  status: status;
};

const AdminPage = () => {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [connected, setConnected] = useState(false);
  const [uploadedVideos, setUploadedVideos] = useState<VideoStatus[]>([]);

  const movieStart = (video: VideoStatus) => {
    console.log("movieStart", video.filename);

    // status を processing に更新
    setUploadedVideos((prev) =>
      prev.map((v) =>
        v.filename === video.filename ? { ...v, status: "processing" } : v,
      ),
    );

    if (audioRef.current) {
      audioRef.current.play();
    } else {
      console.error("audioRef.current is null");
    }

    socket.emit("start", JSON.stringify({ id: video.id }));
  };

  const handleConnect = () => {
    socket.connect();
  };

  const handleDisconnect = () => {
    setUploadedVideos([]);
    socket.disconnect();
  };

  useEffect(() => {
    const onConnected = () => {
      console.log("socket.id", socket.id);
      setConnected(true);
    };
    const onDisconnected = () => {
      setConnected(false);
    };

    socket.on("connect", onConnected);
    socket.on("disconnect", onDisconnected);

    socket.on("photo", (url: string) => {
      console.log("photo", url);

      // status を done に更新
      setUploadedVideos((prev) =>
        prev.map((v) =>
          v.status === "processing"
            ? { ...v, status: "done", imageUrl: url }
            : v,
        ),
      );

      if (audioRef.current) {
        audioRef.current.pause();
      } else {
        console.error("audioRef.current is null");
      }
    });

    socket.on("videoSettled", (message: string) => {
      console.log("videoSettled", message);
      const res = JSON.parse(message);
      setUploadedVideos([
        {
          id: res.name,
          filename: res.mp3Name,
          createdAt: new Date(),
          status: "ready",
        },
        ...uploadedVideos.slice(0, 9),
      ]);
    });
    socket.on("shutter", (message: string) => {
      console.log("shutter", message);
    });

    socket.on("light", (message: string) => {
      console.log("light", message);
    });

    socket.on("success", (message: string) => {
      console.log("success", message);
    });

    socket.on("error", (message: string) => {
      console.log("error", message);
    });

    return () => {
      socket.off("connect", onConnected);
      socket.off("disconnect", onDisconnected);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-2xl p-4 bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center mb-4 dark:text-gray-50">
          Admin Dashboard
        </h2>
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium dark:text-gray-50">
              WebSocket サーバ:
            </span>
            {connected ? (
              <Badge variant="normal">接続済み</Badge>
            ) : (
              <Badge variant="alert">切断済み</Badge>
            )}
          </div>
          <div>CLIENT_ID: {socket.id ?? "undefined"}</div>
        </div>
        <div className="flex justify-center">
          <Button
            className="mr-2"
            onClick={handleConnect}
            disabled={socket.id !== undefined}
          >
            Connect
          </Button>
          <Button
            variant="outline"
            onClick={handleDisconnect}
            disabled={socket.id === undefined}
          >
            Disconnect
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>アップロード時間</TableHead>
              <TableHead>音声ファイル名</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {uploadedVideos.map((video) => (
              <TableRow key={video.filename}>
                <TableCell className="font-medium">
                  {video.createdAt.toLocaleString("ja-JP")}
                </TableCell>
                <TableCell>{video.filename}</TableCell>
                <TableCell>
                  {video.status === "ready" ? (
                    <div>
                      <Button
                        onClick={() => {
                          movieStart(video);
                        }}
                      >
                        再生
                      </Button>
                    </div>
                  ) : video.status === "processing" ? (
                    <Badge variant="alert">再生中</Badge>
                  ) : (
                    <Button
                      onClick={() => {
                        // 新規タブで画像を開く
                        window.open(
                          `${process.env.NEXT_PUBLIC_WS_SERVER_URL}/${video.imageUrl!}`,
                          "_blank",
                        );
                      }}
                      variant="outline"
                    >
                      印刷する
                    </Button>
                  )}
                  <audio
                    ref={audioRef}
                    controls
                    loop
                    style={{ pointerEvents: "none" }}
                  >
                    <source
                      src={`${process.env.NEXT_PUBLIC_WS_SERVER_URL}/${video.filename}`}
                    />
                  </audio>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminPage;
