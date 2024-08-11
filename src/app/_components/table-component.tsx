import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui/table'
import { Trash2 } from 'lucide-react'
const TableComponent = ({
  invoiceData,
  loading,
  error,
  setInvoiceData,
}: any) => {
  const handleClearStorage = () => {
    localStorage.removeItem('invoiceData')
    setInvoiceData(null)
    window.location.reload()
  }
  return (
    <div className="flex flex-col items-center gap-2 justify-center w-full">
      <div className="text-2xl font-semibold">Swipe Invoice Extractor</div>

      {loading ? (
        <div className="w-full flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-1 ">
            <Skeleton className="w-full h-[30px] bg-neutral-200 " />
            <Skeleton className="w-full h-[30px] col-span-2 bg-neutral-200 " />
          </div>
          <div className="grid grid-cols-3 gap-1 ">
            <Skeleton className="w-full h-[30px] bg-neutral-200 " />
            <Skeleton className="w-full h-[30px] col-span-2 bg-neutral-200 " />
          </div>
          <div className="grid grid-cols-3 gap-1 ">
            <Skeleton className="w-full h-[30px] bg-neutral-200 " />
            <Skeleton className="w-full h-[30px] col-span-2 bg-neutral-200 " />
          </div>
          <div className="grid grid-cols-3 gap-1 ">
            <Skeleton className="w-full h-[30px] bg-neutral-200 " />
            <Skeleton className="w-full h-[30px] col-span-2 bg-neutral-200 " />
          </div>
          <div className="grid grid-cols-3 gap-1 ">
            <Skeleton className="w-full h-[30px] bg-neutral-200 " />
            <Skeleton className="w-full h-[30px] col-span-2 bg-neutral-200 " />
          </div>
        </div>
      ) : error ? (
        <div className="flex flex-col gap-2">
          <div className="text-red-500">
            Something went wrong
          </div>
          <Button onClick={handleClearStorage} size="sm">
            Retry
          </Button>
        </div>
      ) : invoiceData ? (
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
      ) : (
        <div className="h-40 p-2 flex flex-col items-center justify-center ">
          <div>No file Uploaded</div>
        </div>
      )}

      <div className="flex items-center justify-end w-full">
        {invoiceData && (
          <Button onClick={handleClearStorage} disabled={loading}>
            <Trash2 className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  )
}

export default TableComponent
