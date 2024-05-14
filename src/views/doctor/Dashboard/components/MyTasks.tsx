import { useCallback, useMemo } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Table from '@/components/ui/Table'
import Tag from '@/components/ui/Tag'
import { useNavigate } from 'react-router-dom'
import UsersAvatarGroup from '@/components/shared/UsersAvatarGroup'
import ActionLink from '@/components/shared/ActionLink'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    ColumnDef,
} from '@tanstack/react-table'
import { OrderColumn } from '../../Appointment/AppointmentList/components/OrdersTable'
import dayjs from 'dayjs'
import { setScheduleSelected, useAppDispatch } from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import Tooltip from '@/components/ui/Tooltip'

import { HiOutlineEye } from 'react-icons/hi'
import { MdDone } from 'react-icons/md'

type Order = {
    id: string
    date: number
    customer: string
    status: number
    paymentMehod: string
    paymentIdendifier: string
    totalAmount: number
}

type MyTasksProps = {
    data?: Order[]
}

const { Tr, Th, Td, THead, TBody } = Table

const ActionColumn = ({ row }: { row: Order }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const handleSubmit = (id: string) => {
        console.log('🚀 ~ handleSubmit ~ id:', id)
        dispatch(
            setScheduleSelected({
                id,
                type: 'offline',
            })
        )
    }

    const onView = useCallback(() => {
        navigate(`/appointment-detail/${row.id}`)
    }, [navigate, row])

    return (
        <div className="flex justify-end text-lg">
            <Tooltip title="View">
                <span
                    className={`cursor-pointer p-2 hover:${textTheme}`}
                    onClick={onView}
                >
                    <HiOutlineEye size={18} />
                </span>
            </Tooltip>
            <Tooltip title="Done">
                <span
                    className="text-sm font-bold text-green-600  cursor-pointer
                            border-spacing-2 border-green-600 rounded-full p-2 hover:bg-green-600 hover:text-white"
                    onClick={() => handleSubmit(row.id)}
                >
                    <MdDone size={18} />
                </span>
            </Tooltip>
        </div>
    )
}

const MyTasks = ({ data = [] }: MyTasksProps) => {
    const navigate = useNavigate()

    const columns: ColumnDef<Order>[] = useMemo(
        () => [
            {
                header: 'Mã đặt lịch hẹn',
                accessorKey: 'id',
                cell: (props) => {
                    const { id } = props.row.original
                    const truncatedId = id.substring(0, 8)
                    return (
                        <ActionLink
                            themeColor={false}
                            className="font-semibold"
                            to={`/appointment-detail/${id}`}
                        >
                            #{truncatedId.toUpperCase()}
                        </ActionLink>
                    )
                },
            },

            {
                header: 'Thời gian khám',
                accessorKey: 'date',
                cell: (props) => {
                    const row = props.row.original
                    return <span>{dayjs(row.date).format('DD/MM/YYYY')}</span>
                },
            },
            {
                header: 'Bệnh nhân',
                accessorKey: 'customer',
            },
            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    )

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const onViewAllTask = () => {
        navigate('/appointment')
    }

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <h4>Danh sách bệnh nhân đặt lịch hẹn tại bệnh viện</h4>
                <Button size="sm" onClick={onViewAllTask}>
                    Xem toàn bộ
                </Button>
            </div>
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
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table.getRowModel().rows.map((row) => {
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
        </Card>
    )
}

export default MyTasks
