import { useMemo } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Table from '@/components/ui/Table'
import Tag from '@/components/ui/Tag'
import { useNavigate } from 'react-router-dom'
import UsersAvatarGroup from '@/components/shared/UsersAvatarGroup'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    ColumnDef,
} from '@tanstack/react-table'
import { OrderColumn } from '../../Appointment/AppointmentList/components/OrdersTable'
import { ActionLink } from '@/components/shared'
import { EStatus } from '@/constants/data.constant'

type Task = {
    id: string
    patientName: string
    status: EStatus
    scheduleTime: string
}

type MyTasksProps = {
    data?: Task[]
}

const { Tr, Th, Td, THead, TBody } = Table

const StatusTag = ({ status }: { status: EStatus }) => {
    switch (status) {
        case EStatus.APPROVED:
            return (
                <Tag className="text-green-600 bg-green-100 dark:text-green-100 dark:bg-green-500/20 rounded border-0">
                    Approved
                </Tag>
            )
        case EStatus.REJECTED:
            return (
                <Tag className="text-red-600 bg-red-100 dark:text-red-100 dark:bg-red-500/20 rounded border-0">
                    Rejected
                </Tag>
            )
        case EStatus.CANCELLED:
            return (
                <Tag className="text-yellow-600 bg-yellow-100 dark:text-yellow-100 dark:bg-yellow-500/20 rounded border-0">
                    Cancelled
                </Tag>
            )
        case EStatus.COMPLETED:
            return (
                <Tag className="text-blue-600 bg-blue-100 dark:text-blue-100 dark:bg-blue-500/20 rounded border-0">
                    Completed
                </Tag>
            )
        case EStatus.AWAITING_PAYMENT:
            return (
                <Tag className="text-purple-600 bg-purple-100 dark:text-purple-100 dark:bg-purple-500/20 rounded border-0">
                    Awaiting Payment
                </Tag>
            )
        default:
            return null
    }
}

const MyTasks = ({ data = [] }: MyTasksProps) => {
    const navigate = useNavigate()

    const columns: ColumnDef<Task>[] = useMemo(
        () => [
            {
                header: 'Số thứ tự',
                accessorKey: 'id',
                cell: (props) => {
                    const { id } = props.row.original
                    return (
                        <ActionLink
                            themeColor={false}
                            className="font-semibold"
                            to="/app/project/scrum-board"
                        >
                            #{id}
                        </ActionLink>
                    )
                },
            },
            {
                header: 'Tên bệnh nhân',
                accessorKey: 'patientName',
            },
            {
                header: 'Trạng thái',
                accessorKey: 'status',
                cell: (props) => {
                    const { status } = props.row.original
                    return <StatusTag status={status} />
                },
            },
            {
                header: 'Thời gian hẹn khám',
                accessorKey: 'scheduleTime',
                cell: (props) => {
                    const { scheduleTime } = props.row.original
                    return scheduleTime
                },
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
