import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
  } from '@/components/ui/table'
  import { Trash2 } from 'lucide-react'
const TableComponent = ({invoiceData,loading,error,setInvoiceData}:any) => {
    const handleClearStorage = () => {
        localStorage.removeItem('invoiceData')
        setInvoiceData(null)
      }
    return (    <div className="flex flex-col items-center gap-2 justify-center w-full">
        <div className="text-2xl font-semibold">Invoice Extractor</div>

        {loading ? (
          <div>Loading invoice data...</div>
        ) : error ? (
          <div className="text-red-500">Error: {error}</div>
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
          <div>No invoice data available.</div>
        )}

        <div className='flex items-center justify-end w-full'>
          {invoiceData && (
            <Button onClick={handleClearStorage}>
              <Trash2 className='h-5 w-5'/>
            </Button>
          )}
        </div>
      </div> );
}
 
export default TableComponent;