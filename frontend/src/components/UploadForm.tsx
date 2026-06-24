"use client";

import { ChangeEvent, useState } from "react";
import { ImageUp } from "lucide-react";
import { createClient, hasSupabaseBrowserEnv } from "@/lib/supabase/client";

export function UploadForm({ userId }: { userId: string }) {
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const isConfigured = hasSupabaseBrowserEnv();

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!isConfigured) {
      setMessage(`로컬 UI 테스트: ${file.name} 선택됨. Supabase 키 설정 후 실제 업로드됩니다.`);
      return;
    }

    const supabase = createClient();
    setUploading(true);
    setMessage("");

    const bucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET ?? "saju-images";
    const extension = file.name.split(".").pop() ?? "bin";
    const path = `${userId}/${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

    setUploading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("이미지가 업로드되었습니다.");
  }

  return (
    <label className="upload-zone field">
      이미지 파일
      <input className="input" type="file" accept="image/*" disabled={uploading} onChange={handleUpload} />
      <span className="button primary">
        <ImageUp size={18} />
        {uploading ? "업로드 중" : "파일 선택"}
      </span>
      <span className="notice" role="status">
        {message || (!isConfigured ? "Supabase Storage 설정 전에는 실제 업로드하지 않습니다." : "")}
      </span>
    </label>
  );
}
