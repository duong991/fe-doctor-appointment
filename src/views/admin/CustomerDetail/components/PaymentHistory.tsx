import { useState } from 'react'
import Table from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    createColumnHelper,
} from '@tanstack/react-table'
import { NumericFormat } from 'react-number-format'
import { useAppSelector } from '../store'
import type { PaymentHistory } from '../store'
import dayjs from 'dayjs'
import { EPaymentStatus } from '@/constants/data.constant'
import { getPaymentStatusLabel } from '@/utils/imagePath'

const { Tr, Th, Td, THead, TBody, Sorter } = Table

const statusColor: Record<EPaymentStatus, string> = {
    [EPaymentStatus.PENDING]: 'bg-amber-400',
    [EPaymentStatus.SUCCESS]: 'bg-emerald-500',
    [EPaymentStatus.FAILED]: 'bg-red-500',
}

const columnHelper = createColumnHelper<PaymentHistory>()

const columns = [
    columnHelper.accessor('id', {
        header: 'Mã giao dịch',
        cell: (props) => {
            const row = props.row.original
            const shortId = row.id.slice(0, 8)
            return (
                <div>
                    <span className="cursor-pointer">{shortId}</span>
                </div>
            )
        },
    }),

    columnHelper.accessor('status', {
        header: 'Trạng thái',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    <Badge className={statusColor[row.status]} />
                    <span className="ml-2 rtl:mr-2 capitalize">
                        {getPaymentStatusLabel(row.status)}
                    </span>
                </div>
            )
        },
    }),
    columnHelper.accessor('date', {
        header: 'Ngày thanh toán',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    {dayjs(row.date).format('MM/DD/YYYY')}
                </div>
            )
        },
    }),
    columnHelper.accessor('amount', {
        header: 'Số tiền',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    <NumericFormat
                        displayType="text"
                        value={(Math.round(row.amount * 100) / 100).toFixed(0)}
                        suffix={' VND'}
                        thousandSeparator={true}
                    />
                </div>
            )
        },
    }),
]

const PaymentHistory = () => {
    const data = useAppSelector(
        (state) => state.crmCustomerDetails.data.paymentHistoryData
    )

    const [sorting, setSorting] = useState<
        {
            id: string
            desc: boolean
        }[]
    >([])

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <div className="mb-8">
            <h6 className="mb-4">Lịch sử thanh toán</h6>
            <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                {...{
                                                    className:
                                                        header.column.getCanSort()
                                                            ? 'cursor-pointer select-none'
                                                            : '',
                                                    onClick:
                                                        header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                                {
                                                    <Sorter
                                                        sort={header.column.getIsSorted()}
                                                    />
                                                }
                                            </div>
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table
                        .getRowModel()
                        .rows.slice(0, 10)
                        .map((row) => {
                            return (
                                <Tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <Td key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </Td>
                                        )
                                    })}
                                </Tr>
                            )
                        })}
                </TBody>
            </Table>
        </div>
    )
}

export default PaymentHistory
