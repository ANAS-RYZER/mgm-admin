import TableComponent from '@/components/TableComponent'
import { AdminLayout } from '@/components/layout/AdminLayout'
import React from 'react'
import { commissionsListCols } from './schemas/commissionsListCols'
import Pagination from '@/components/pagination/pagination'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowDownToLineIcon } from 'lucide-react'
import { exportCommissionsToCsv } from './utils/exportCommissionsToCsv'
import { toast } from 'sonner'

const index = () => {
  const cols = commissionsListCols();
  const commissionsData: any[] = [];

  const handleExportCsv = () => {
    if (!commissionsData.length) {
      toast.error('No commission data available to export');
      return;
    }

    exportCommissionsToCsv({
      columns: cols,
      rows: commissionsData,
      fileName: `commissions-${new Date().toISOString().slice(0, 10)}.csv`,
    });
    toast.success('Commission CSV exported successfully');
  };

  return (
    <AdminLayout title="Commissions">
      <div className='space-y-6'>
        <h1 className='text-lg font-semibold'>Commissions</h1>
        <div className='flex items-center gap-2'>
          <Input placeholder='Search by name or email' />
          <Button variant='default' className='gap-2' onClick={handleExportCsv}>Export <ArrowDownToLineIcon className='w-4 h-4' /></Button>
        </div>
        <TableComponent columns={cols} data={commissionsData} model="Commissions" />
      </div>
    </AdminLayout>
  )
}

export default index