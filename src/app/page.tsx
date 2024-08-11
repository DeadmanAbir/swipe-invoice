"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import TableComponent from "./_components/table-component";

export interface InvoiceData {
  customer_name: string;
  customer_address: string;
  customer_number: string;
  customer_mail: string;
  products: string;
  total_amount: string;
}

export default function Home() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [fileURL, setFileURL] = useState<string | null>(null);
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFileFromLocalStorage, setIsFileFromLocalStorage] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    setFiles(fileList);

    if (fileList && fileList[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result as string;
        setFileURL(url);
        localStorage.setItem("fileURL", url);
        setIsFileFromLocalStorage(false);
      };
      reader.readAsDataURL(fileList[0]);
    }
  };

  useEffect(() => {
    const storedInvoiceData = localStorage.getItem("invoiceData");
    const storedFileURL = localStorage.getItem("fileURL");

    if (storedInvoiceData && storedFileURL) {
      setInvoiceData(JSON.parse(storedInvoiceData));
      setFileURL(storedFileURL);
      setIsFileFromLocalStorage(true);
    }
  }, []);

  useEffect(() => {
    if (invoiceData) {
      localStorage.setItem("invoiceData", JSON.stringify(invoiceData));
    }
  }, [invoiceData]);

  const handleSubmit = () => {
    if (files) {
      setLoading(true);
      setError(null);
      const formData = new FormData();
      formData.set("file", files[0]);

      fetch("/api/extractInvoice", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to extract invoice data.");
          }
          return response.json();
        })
        .then((data) => {
          const parsedData = JSON.parse(data.data.content);
          setInvoiceData(parsedData);
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 grid-cols-1 gap-2 justify-center items-center pt-20 max-w-[1440px] mx-auto p-3">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="flex items-center space-x-3">
          <Input
            type="file"
            accept=".pdf, .jpg, .jpeg, .png, .docx, .ppt, .pptx, .doc"
            onChange={handleFileChange}
            className="file-input"
          />
          <Button
            onClick={handleSubmit}
            disabled={!fileURL || loading || isFileFromLocalStorage}
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </div>

        {fileURL && (
          <div className="mt-6 w-full max-w-2xl h-96 border border-gray-300 shadow-lg">
            <iframe
              src={fileURL}
              className="w-full h-full"
              title="Uploaded File"
            ></iframe>
          </div>
        )}
      </div>
      <TableComponent
        invoiceData={invoiceData}
        error={error}
        setInvoiceData={setInvoiceData}
        loading={loading}
      />
    </div>
  );
}
