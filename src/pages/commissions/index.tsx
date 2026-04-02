import TableComponent from '@/components/TableComponent'
import { AdminLayout } from '@/components/layout/AdminLayout'
import React, { useState } from 'react'
import { commissionsListCols } from './schemas/commissionsListCols'
import Pagination from '@/components/pagination/pagination'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowDownToLineIcon } from 'lucide-react'
import { exportCommissionsToCsv } from './utils/exportCommissionsToCsv'
import { toast } from 'sonner'
import { useGetCommissionList } from './hooks/useGetCommissionList'
import { useDebounce } from '@/hooks/useDebounce'
import LoadingSpinner from '@/components/LoadingSpinner'

const index = () => {
  const cols = commissionsListCols();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const searchTerm = useDebounce(search, 500);
  const { data: commissionsData, isFetching: isLoadingCommissions } = useGetCommissionList({ page: page, limit: limit, search: searchTerm });
  const rows = commissionsData?.data || [];

  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };

  const onPageSizeChange = (pageSize: number) => {
    setLimit(pageSize);
    setPage(1);
  };

  const handleExportCsv = () => {
    if (!rows.length) {
      toast.error('No commission data available to export');
      return;
    }

    exportCommissionsToCsv({
      columns: cols,
      rows,
      fileName: `commissions-${new Date().toISOString().slice(0, 10)}.csv`,
    });
    toast.success('Commission CSV exported successfully');
  };

  

  return (
    <AdminLayout title="Commissions" searchBar={false} description="View and manage commissions for all orders">
      <div className='space-y-6'>
        <h1 className='text-lg font-semibold'>Commissions</h1>
        <div className='flex items-center gap-2'>
          <Input placeholder='Search by name or email' value={search} onChange={(e) => setSearch(e.target.value)} />
          <Button variant='default' className='gap-2' onClick={handleExportCsv}>Export <ArrowDownToLineIcon className='w-4 h-4' /></Button>
        </div>
        {isLoadingCommissions ? (
          <div className="p-4 mt-10 text-sm text-muted-foreground">
            <LoadingSpinner label={"Loading Commissions..."} />
          </div>
        ) : (
          <TableComponent columns={cols} data={rows} model="Commissions" />
        )}
        {commissionsData && (
          <Pagination
            currentPage={commissionsData.page || page}
            totalPages={commissionsData.totalPages || 1}
            hasPreviousPage={(commissionsData.page || page) > 1}
            hasNextPage={(commissionsData.page || page) < (commissionsData.totalPages || 1)}
            limit={commissionsData.limit || limit}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        )}
      </div>
    </AdminLayout>
  )
}

export default index