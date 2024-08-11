"use client";
import { useState } from "react";

export default function Home() {
  const [files, setFiles] = useState<FileList | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    setFiles(fileList);
  };

  const handleSubmit = () => {
    if (files) {
      const formData = new FormData();
      formData.set("file", files[0]);

      fetch("/api/extractInvoice", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(JSON.parse(data.data.output));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <h1 className="text-xl font-semibold mb-6">Invoice Extractor</h1>
      <div className="flex items-center space-x-3">
        <input
          type="file"
          accept=".pdf, .jpg, .jpeg, .png, .docx, .ppt, .pptx, .doc"
          onChange={handleFileChange}
          className="file-input"
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          Upload
        </button>
      </div>
    </div>
  );
}
