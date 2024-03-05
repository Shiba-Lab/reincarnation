import { client } from "@/lib/r2-bucket";
import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Home() {
  // S3 へのアップロード
  const uploadImage = async (formData: FormData) => {
    "use server";

    const videoFile = formData.get("video") as File;
    const bufferedVideoFile = await videoFile.arrayBuffer();

    const uploadParams: PutObjectCommandInput = {
      Bucket: "shibalab-reincarnation",
      Key: videoFile.name,
      Body: bufferedVideoFile,
      ContentType: videoFile.type,
      ACL: "public-read",
    };
    const command = new PutObjectCommand(uploadParams);
    await client.send(command);

    redirect(
      `https://shibalab-reincarnation-r2.shogo0x2e.com/${videoFile.name}`,
    );
  };

  return (
    <main>
      <div className="flex flex-col h-screen w-screen justify-center items-center">
        <h1 className="font-bold mb-10">動画入力</h1>
        <form action={uploadImage}>
          <input type="file" name="video" />
          <button type="submit">送信</button>
        </form>
      </div>
    </main>
  );
}
