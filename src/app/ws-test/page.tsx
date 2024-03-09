"use client";

import { Button } from "@/components/ui/button";
import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";

const Page = () => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onHelloEvent = (value: string) => {
      setMessages((prev) => [...prev, value]);
      setIsLoading(false);
      setValue("");
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("hello", onHelloEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("hello", onHelloEvent);
    };
  }, []);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    console.log("emit", value);

    socket.timeout(5000).emit("message", value);
  };

  return (
    <div>
      <p>State: {"" + isConnected}</p>
      <h1>Messages</h1>
      <ul>
        {messages.map((message, i) => (
          <li key={i}>{message}</li>
        ))}
      </ul>
      <Button onClick={() => socket.connect()}>Connect</Button>
      <Button onClick={() => socket.disconnect()}>Disconnect</Button>
      <div className="w-full bg-gray-500">divider</div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <Button type="submit" disabled={isLoading}>
          Send
        </Button>
      </form>
    </div>
  );
};

export default Page;
