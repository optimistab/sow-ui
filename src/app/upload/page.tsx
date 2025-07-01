"use client";

import { useRef, useState } from "react";

export default function UploadPage() {
const [file, setFile] = useState<File | null>(null);
const [status, setStatus] = useState("");
const fileInputRef = useRef<HTMLInputElement | null>(null);

const handleUpload = async () => {
if (!file) {
setStatus("Please select a file before uploading.");
return;
}


const formData = new FormData();
formData.append("file", file);

setStatus("Uploading...");

try {
  const res = await fetch("http://localhost:8000/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  const result = await res.json();
  setStatus(result.message || "Upload successful!");
} catch (error) {
  console.error("Upload error:", error);
  setStatus("Upload failed. Please try again.");
}
};

return (
<div className="p-6 max-w-xl mx-auto text-center">
<h1 className="text-2xl font-bold mb-6">Upload Requirements</h1>

  <input
    ref={fileInputRef}
    type="file"
    onChange={(e) => setFile(e.target.files?.[0] || null)}
    className="hidden"
    accept=".pdf,.docx"
  />

  <button
    type="button"
    onClick={() => fileInputRef.current?.click()}
    className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 mb-4"
  >
    {file ? `Selected: ${file.name}` : "Choose File"}
  </button>

  <br />

  <button
    onClick={handleUpload}
    disabled={!file}
    className={`${
      file ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"
    } text-white px-4 py-2 rounded`}
  >
    Upload
  </button>

  {status && <p className="mt-4 text-green-700">{status}</p>}
</div>
);
}