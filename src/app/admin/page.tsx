"use client";
import { socket } from "@/lib/socket";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

const AdminPage = () => {
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    socket.connect();
  };

  const handleDisconnect = () => {
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
    });

    socket.on("videoSettled", (message: string) => {
      console.log("videoSettled", message);
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
      <div className="w-full max-w-md p-4 bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center mb-4 dark:text-gray-50">
          Admin Dashboard
        </h2>
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-medium dark:text-gray-50">
            WebSocket サーバ:
          </span>
          {connected ? (
            <Badge variant="normal">接続済み</Badge>
          ) : (
            <Badge variant="alert">切断済み</Badge>
          )}
        </div>
        <div className="text-right">{connected && `ID: ${socket.id}`}</div>
        <div className="flex items-center justify-between my-4">
          <span className="text-lg font-medium dark:text-gray-50">
            現在のステータス:
          </span>
          <Badge variant="caution">Processing</Badge>
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
      </div>
    </div>
  );
};

export default AdminPage;
