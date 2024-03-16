"use client";
import { redirect, useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default async function Component() {
  const router = useRouter();
  const [isPushed, setIsPushed] = useState(false);

  const handleAction = async (formData: FormData) => {
    if (!formData.get("video")) {
      throw new Error("動画を選択してください");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WS_SERVER_URL}/api/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) {
      console.error(response);
      throw new Error("動画のアップロードに失敗しました");
    }

    router.push("/notification/processing");
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
        </form>
      </div>
    </div>
  );
}
