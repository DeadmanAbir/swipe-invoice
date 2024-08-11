'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Home() {
  const [files, setFiles] = useState<FileList | null>(null)
  const [fileURL, setFileURL] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files
    setFiles(fileList)

    if (fileList && fileList[0]) {
      const url = URL.createObjectURL(fileList[0])
      setFileURL(url)
    }
  }

  const handleSubmit = () => {
    if (files) {
      const formData = new FormData()
      formData.set('file', files[0])

      fetch('/api/extractInvoice', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(JSON.parse(data.data.output))
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
  }

  return (
    <div className="min-h-screen grid md:grid-cols-3 grid-cols-1 gap-2 justify-start items-start pt-20  max-w-[1440px]  mx-auto p-3">
      <div className="w-full flex flex-col items-center justify-center ">
        <div className="flex items-center space-x-3">
          <Input
            type="file"
            accept=".pdf, .jpg, .jpeg, .png, .docx, .ppt, .pptx, .doc"
            onChange={handleFileChange}
            className="file-input "
          />
          <Button onClick={handleSubmit}>Upload</Button>
        </div>

        {fileURL && (
          <div className="mt-6 w-full max-w-2xl h-96 border border-gray-300 shadow-lg">
            <iframe
              src={fileURL}
              className="w-full h-full"
              title="Uploaded PDF"
            ></iframe>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center col-span-2  w-full">
      <Table>
  <TableHeader>
    <TableRow>
      <TableHead>Customer Name</TableHead>
      <TableHead>Customer Address</TableHead>
      <TableHead>Customer Number</TableHead>
      <TableHead >Customer Mail</TableHead>
      <TableHead >Products</TableHead>
      <TableHead >Total Amount</TableHead>


    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>   <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
    </TableRow>
  </TableBody>
</Table>

      </div>
    </div>
  )
}
