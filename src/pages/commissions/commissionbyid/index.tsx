import TableComponent from '@/components/TableComponent'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeftIcon } from 'lucide-react'
import React from 'react'
import OrderBreakdown from '../components/orderBreakdown'
import { useNavigate } from 'react-router-dom'
import ProductCard from '@/pages/appointments/components/ProductCard'

const index = () => {
    const Details = {
        name: "Charan Teja",
        email: "charanteja@gmail.com",
        PartnerId: "ASDF-123",
        BankAccountNumber: "XXXXXXXX9089",
        BankName: "Bank of America",
    }
    const orderProducts = [
        {
            productSku: "1234567890",
            productName: "Product 1",
            image: "https://via.placeholder.com/150",
            productPrice: 100,
        },
        {
            productSku: "1234567890",
            productName: "Product 2",
            image: "https://via.placeholder.com/150",
            productPrice: 200,
        },
    ]
    const navigate = useNavigate();
    return (
        <AdminLayout title="Commission by ID">
            <div className='space-y-6'>
                <div className='flex items-center gap-2'>
                    <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                        <ArrowLeftIcon className='w-4 h-4' />
                    </Button>
                    <h1 className='text-lg font-semibold'>Commission Details</h1>
                </div>
                <Card className='p-2'>
                    <CardContent className='p-4'>
                        <div className='flex items-center gap-4 w-full'>
                            <div className='w-14 h-14 rounded-full bg-gold text-primary flex items-center justify-center'>
                                <p className='text-2xl font-semibold text-center'>{Details.name.charAt(0)}</p>
                            </div>
                            <div className='flex gap-2 justify-between items-center w-full'>
                                <div className='flex flex-col gap-1'>
                                    <h1 className='text-2xl font-semibold'>{Details.name}</h1>
                                    <p className='text-sm text-muted-foreground'>{Details.email}</p>
                                </div>
                                <div>
                                    <div className='flex items-center gap-2'>
                                        <p className='text-sm text-muted-foreground'>Partner ID:</p>
                                        <p className='text-sm text-primary'>{Details.PartnerId}</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <p className='text-sm text-muted-foreground'>Bank Account Number:</p>
                                        <p className='text-sm text-primary'>{Details.BankAccountNumber}</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <p className='text-sm text-muted-foreground'>Bank Name:</p>
                                        <p className='text-sm text-primary'>{Details.BankName}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <div>
                    <div className='grid grid-cols-5 gap-2'>
                        <div className='grid col-span-3 rounded-lg'>
                            <div className='border bg-white rounded-lg p-4 space-y-2 '>
                                <h1 className='text-lg font-semibold'>Products Ordered</h1>
                                <div className=' grid grid-cols-3 gap-2'>
                                    {orderProducts.map((product) => (
                                        <ProductCard image={product.image} name={product.productName} sku={product.productSku} price={product.productPrice} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='grid col-span-2 rounded-lg'>
                            <OrderBreakdown baseValue={58287} valueAddition={1000} makingCharges={2} discountAmount={593} commissionRate={0.1} />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default index