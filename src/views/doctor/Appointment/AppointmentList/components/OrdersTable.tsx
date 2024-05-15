import { useEffect, useCallback, useMemo, useRef } from 'react'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import { HiOutlineEye } from 'react-icons/hi'
import {
    setSelectedRows,
    setDeleteMode,
    setSelectedRow,
    getOrders,
    setTableData,
    useAppDispatch,
    useAppSelector,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable'
import { MdDone } from 'react-icons/md'
import { EStatus } from '@/constants/data.constant'

type Order = {
    id: string
    scheduleDate: string
    patientName: string
    scheduleTime: string
    status: EStatus
    paymentMethod: string
    totalAmount: number
}

export const OrderColumn = ({ row }: { row: Order }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onView = useCallback(() => {
        navigate(`/appointment-detail/${row.id}`)
    }, [navigate, row])
    const truncatedId = row.id.substring(0, 8)
    return (
        <span
            className={`cursor-pointer select-none font-bold hover:${textTheme}`}
            onClick={onView}
        >
            #{truncatedId.toLocaleUpperCase()}
        </span>
    )
}

const ActionColumn = ({ row }: { row: Order }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onConfirm = () => {
        dispatch(setDeleteMode('single'))
        dispatch(setSelectedRow(row.id))
    }

    const onView = useCallback(() => {
        navigate(`/appointment-detail/${row.id}`)
    }, [navigate, row])

    return (
        <div className="flex justify-end text-lg">
            <Tooltip title="Xem chi tiết">
                <span
                    className={`cursor-pointer p-2 hover:${textTheme}`}
                    onClick={onView}
                >
                    <HiOutlineEye size={18} />
                </span>
            </Tooltip>
            <Tooltip title="Hoàn thành">
                <span
                    className="text-sm font-bold text-green-600  cursor-pointer
                            border-spacing-2 border-green-600 rounded-full p-2 hover:bg-green-600 hover:text-white"
                    onClick={onConfirm}
                >
                    <MdDone size={18} />
                </span>
            </Tooltip>
        </div>
    )
}

const OrdersTable = () => {
    // const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.salesOrderList.data.tableData
    )
    const loading = useAppSelector((state) => state.salesOrderList.data.loading)

    const data = useAppSelector((state) => state.salesOrderList.data.orderList)

    const fetchData = useCallback(() => {
        console.log('{ pageIndex, pageSize, sort, query }', {
            pageIndex,
            pageSize,
            sort,
            query,
        })
        dispatch(getOrders({ pageIndex, pageSize, sort, query }))
    }, [dispatch, pageIndex, pageSize, sort, query])

    useEffect(() => {
        dispatch(setSelectedRows([]))
        fetchData()
    }, [dispatch, fetchData, pageIndex, pageSize, sort])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const columns: ColumnDef<Order>[] = useMemo(
        () => [
            {
                header: 'Mã Lịch hẹn',
                accessorKey: 'id',
                cell: (props) => {
                    return <OrderColumn row={props.row.original} />
                },
            },
            {
                header: 'Thời gian khám',
                accessorKey: 'scheduleTime',
                cell: (props) => {
                    const row = props.row.original
                    return <span>{row.scheduleTime}</span>
                },
            },
            {
                header: 'Bệnh nhân',
                accessorKey: 'patientName',
            },

            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    )

    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    return (
        <DataTable
            columns={columns}
            data={data}
            loading={loading}
            pagingData={{
                total: tableData.total as number,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            onPaginationChange={onPaginationChange}
            onSelectChange={onSelectChange}
            onSort={onSort}
        />
    )
}

export default OrdersTable
