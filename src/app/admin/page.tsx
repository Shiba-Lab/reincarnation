"use client";
import { socket } from "@/lib/socket";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

const AdminPage = () => {
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    const onConnected = () => {
      setConnected(true);
    };
    const onDisconnected = () => {
      setConnected(false);
    };

    socket.on("connect", onConnected);
    socket.on("disconnect", onDisconnected);

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
            WebSocket Status:
          </span>
          {connected ? (
            <Badge variant="normal">Connected</Badge>
          ) : (
            <Badge variant="alert">Disconnected</Badge>
          )}
        </div>
        <div className="text-right">{connected && socket.id}</div>
        <div className="flex items-center justify-between my-4">
          <span className="text-lg font-medium dark:text-gray-50">
            Process Status:
          </span>
          <Badge variant="caution">Processing</Badge>
        </div>
        <div className="flex justify-center">
          <Button className="mr-2">Connect</Button>
          <Button variant="outline">Disconnect</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
