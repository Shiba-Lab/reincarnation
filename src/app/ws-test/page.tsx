"use client";

//パスは変更してください
import { useEffect, useState } from "react";
import { ServerToClientEvents, ClientToServerEvents } from "../../model/model";
import { io, Socket } from "socket.io-client";
import { Button } from "@/components/ui/button";

export default function Home() {
  // FIXME: Production では、サーバーのURLを環境変数から取得するようにする
  const [socket, setSocket] = useState<
    Socket<ServerToClientEvents, ClientToServerEvents>
  >(io("http://localhost:3001"));

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.connected);
    });

    socket.on("hello", (message) => {
      console.log(message);
    });
  }, []);

  return (
    <Button
      variant="secondary"
      onClick={() => {
        socket.emit("message", "hello world");
      }}
    >
      Send "hello world"
    </Button>
  );
}
