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
import type { AppointmentHistory } from '../store'
import dayjs from 'dayjs'
import { EPaymentStatus, EStatus } from '@/constants/data.constant'
import {
    getAppointmentStatusLabel,
    getPaymentStatusLabel,
} from '@/utils/imagePath'
import { Link } from 'react-router-dom'

const { Tr, Th, Td, THead, TBody, Sorter } = Table

const statusColor: Record<EStatus, string> = {
    [EStatus.APPROVED]: 'bg-emerald-500',
    [EStatus.REJECTED]: 'bg-red-500',
    [EStatus.CANCELLED]: 'bg-gray-500',
    [EStatus.COMPLETED]: 'bg-blue-500',
    [EStatus.AWAITING_PAYMENT]: 'bg-amber-400',
}

const columnHelper = createColumnHelper<AppointmentHistory>()
const columns = [
    columnHelper.accessor('id', {
        header: 'Mã đặt lịch',
        cell: (props) => {
            const row = props.row.original
            const shortId = row.id.slice(0, 8)
            return (
                <div>
                    <span className="cursor-pointer">
                        <Link
                            to={`/appointment-detail/${props.row.original.id}`}
                        >
                            {shortId}
                        </Link>
                    </span>
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
                        {getAppointmentStatusLabel(row.status)}
                    </span>
                </div>
            )
        },
    }),
    columnHelper.accessor('date', {
        header: 'Ngày khám',
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

const AppointmentHistory = () => {
    const data = useAppSelector(
        (state) => state.crmCustomerDetails.data.appointmentHistoryData
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
            <h6 className="mb-4">Lịch sử khám bệnh</h6>
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

export default AppointmentHistory
