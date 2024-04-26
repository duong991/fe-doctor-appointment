import { useState } from 'react'
import Table from '@/components/ui/Table'
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    createColumnHelper,
} from '@tanstack/react-table'
import { useAppSelector, OrderHistory } from '../store'
import dayjs from 'dayjs'

const { Tr, Th, Td, THead, TBody, Sorter } = Table

const columnHelper = createColumnHelper<OrderHistory>()

const columns = [
    columnHelper.accessor('item', {
        header: 'Tên',
    }),
    columnHelper.accessor('status', {
        header: 'Chuyên khoa',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    <span className="ml-2 rtl:mr-2 capitalize">
                        {row.status}
                    </span>
                </div>
            )
        },
    }),
    columnHelper.accessor('date', {
        header: 'Đánh giá',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    {dayjs.unix(row.date).format('MM/DD/YYYY')}
                </div>
            )
        },
    }),
]

const DoctorFavorite = () => {
    const data = useAppSelector(
        (state) => state.crmCustomerDetails.data.paymentHistoryData
    )

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <div className="mb-8">
            <h6 className="mb-4">Bác sĩ yêu thích</h6>
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

export default DoctorFavorite
