'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Eraser, Trash, Trash2 } from 'lucide-react'

export default function Home() {
  const [files, setFiles] = useState<FileList | null>(null)
  const [fileURL, setFileURL] = useState<string | null>(null)
  const [invoiceData, setInvoiceData] = useState(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files
    setFiles(fileList)

    if (fileList && fileList[0]) {
      const url = URL.createObjectURL(fileList[0])
      setFileURL(url)
    }
  }
  useEffect(() => {
    const storedInvoiceData = localStorage.getItem('invoiceData')
    if (storedInvoiceData) {
      setInvoiceData(JSON.parse(storedInvoiceData))
    }
  }, [])
  useEffect(() => {
    if (invoiceData) {
      localStorage.setItem('invoiceData', JSON.stringify(invoiceData))
    }
  }, [invoiceData])
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
          const parsedData = JSON.parse(data.data.output)
          setInvoiceData(parsedData)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
  }
  const handleClearStorage = () => {
    localStorage.removeItem('invoiceData')
    setInvoiceData(null)
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2 grid-cols-1 gap-2 justify-center items-center pt-20 max-w-[1440px] mx-auto p-3">
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
      <div className="flex flex-col items-center gap-2 justify-center w-full">
        <div className="text-2xl font-semibold">Invoice Extractor</div>

        {invoiceData && (
          <Table>
            <TableBody className="border-2">
              <TableRow>
                <TableHead>Customer Name</TableHead>
                <TableCell>{invoiceData.customer_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Customer Address</TableHead>
                <TableCell>{invoiceData.customer_address}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Customer Number</TableHead>
                <TableCell>{invoiceData.customer_number}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Customer Mail</TableHead>
                <TableCell>{invoiceData.customer_mail}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Products</TableHead>
                <TableCell>{invoiceData.products}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Total Amount</TableHead>
                <TableCell>{invoiceData.total_amount}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
        <div className='flex items-center justify-end w-full'>
        {invoiceData && (
          <Button onClick={handleClearStorage}><Trash2 className='h-5 w-5'/></Button>
        )}
        </div>
       
      </div>
    </div>
  )
}
