"use client";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import axios from "axios";

export default async function Component() {
  const router = useRouter();
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [isPushed, setIsPushed] = useState(false);

  const handleAction = async (formData: FormData) => {
    if (!formData.get("video")) {
      throw new Error("動画を選択してください");
    }

    fetch(
      "https://discord.com/api/webhooks/1218182319312080959/02OMNPDCSae-rHEzGZymGDRDgtwf7DnOrD4IZCg0Iid6uH3uog-05hIgFD_xHaTL9Rw2",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: "動画のアップロードが開始されました。",
        }),
      },
    );

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_WS_SERVER_URL}/api/upload`,
      formData,
      {
        onUploadProgress: (progressEvent) => {
          if (!indicatorRef.current) return;
          if (!progressEvent.total) {
            indicatorRef.current.innerHTML = "アップロード中...";
            return;
          }

          const percent = Math.floor(
            (progressEvent.loaded / progressEvent.total) * 100,
          );
          indicatorRef.current.innerHTML = `アップロード中... ${percent}%`;
        },
      },
    );

    if (response.status !== 200) {
      console.error(response);
      throw new Error("動画のアップロードに失敗しました");
    }

    router.push("/camera");
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div className="text-center">
        <img
          alt="Circle Logo"
          className="mx-auto h-24 w-24 rounded-full object-cover"
          height="90"
          src="/ShibaLab.svg"
          width="90"
        />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-gray-100">
          リ・インカーネーション
        </h2>
        <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
          再生: Reincarnation
        </p>
      </div>
      <div className="mt-12">
        <form className="grid gap-6" action={handleAction}>
          <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
            <Label htmlFor="video">Video</Label>
            <Input accept="video/*" name="video" type="file" />
          </div>
          <div className="flex justify-center">
            <Button
              className="w-full max-w-md"
              type="submit"
              disabled={isPushed}
            >
              撮影準備に進む
            </Button>
          </div>
          <div ref={indicatorRef}></div>
        </form>
      </div>
    </div>
  );
}
