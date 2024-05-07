import { useEffect, useCallback, useMemo, useRef } from 'react'
import Badge from '@/components/ui/Badge'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi'
import { NumericFormat } from 'react-number-format'
import {
    setSelectedRows,
    addRowItem,
    removeRowItem,
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
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
    Row,
} from '@/components/shared/DataTable'
// eslint-disable-next-line import/named
import { EPaymentType, EStatus } from '@/constants/data.constant'

type Order = {
    id: string
    date: number
    patient: string
    status: EStatus
    paymentMethod: EPaymentType
    totalAmount: number
}

const orderStatusColor: Record<
    EStatus,
    {
        label: string
        dotClass: string
        textClass: string
    }
> = {
    [EStatus.APPROVED]: {
        label: 'Approved',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    [EStatus.REJECTED]: {
        label: 'Rejected',
        dotClass: 'bg-red-500',
        textClass: 'text-red-500',
    },
    [EStatus.CANCELLED]: {
        label: 'Cancelled',
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
    },
    [EStatus.COMPLETED]: {
        label: 'Completed',
        dotClass: 'bg-blue-500',
        textClass: 'text-blue-500',
    },
    [EStatus.AWAITING_PAYMENT]: {
        label: 'Awaiting Payment',
        dotClass: 'bg-yellow-500',
        textClass: 'text-yellow-500',
    },
}

const PaymentMethodImage = ({
    paymentMethod,
    className,
}: {
    paymentMethod: string
    className: string
}) => {
    switch (paymentMethod) {
        case 'ONLINE':
            return (
                <img
                    className={className}
                    src="/img/others/img-8.png"
                    alt={paymentMethod}
                />
            )
        case 'SMARTCARD':
            return (
                <img
                    className={className}
                    src="/img/others/img-9.png"
                    alt={paymentMethod}
                />
            )
        default:
            return <></>
    }
}

const PaymentColumn = ({ row }: { row: Order }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onView = useCallback(() => {
        navigate(`/payment/details/${row.id}`)
    }, [navigate, row])
    const shortId = row.id.substr(0, 8)
    return (
        <span
            className={`cursor-pointer select-none font-semibold hover:${textTheme}`}
            onClick={onView}
        >
            #{shortId}
        </span>
    )
}

const ActionColumn = ({ row }: { row: Order }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onDelete = () => {
        dispatch(setDeleteMode('single'))
        dispatch(setSelectedRow([row.id]))
    }

    const onView = useCallback(() => {
        navigate(`/payment/details/${row.id}`)
    }, [navigate, row])

    return (
        <div className="flex justify-end text-lg">
            <Tooltip title="View">
                <span
                    className={`cursor-pointer p-2 hover:${textTheme}`}
                    onClick={onView}
                >
                    <HiOutlineEye />
                </span>
            </Tooltip>
            <Tooltip title="Delete">
                <span
                    className="cursor-pointer p-2 hover:text-red-500"
                    onClick={onDelete}
                >
                    <HiOutlineTrash />
                </span>
            </Tooltip>
        </div>
    )
}

const PaymentTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

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

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSelected()
        }
    }, [data])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const columns: ColumnDef<Order>[] = useMemo(
        () => [
            {
                header: 'Mã Số',
                accessorKey: 'id',
                cell: (props) => <PaymentColumn row={props.row.original} />,
            },
            {
                header: 'Ngày Khám',
                accessorKey: 'date',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span>
                            {dayjs(row.date, 'YYYY-MM-DD').format('DD/MM/YYYY')}
                        </span>
                    )
                },
            },
            {
                header: 'Người Khám',
                accessorKey: 'customer',
            },
            {
                header: 'Trạng thái',
                accessorKey: 'status',
                cell: (props) => {
                    const { status } = props.row.original
                    return (
                        <div className="flex items-center">
                            <Badge
                                className={orderStatusColor[status].dotClass}
                            />
                            <span
                                className={`ml-2 rtl:mr-2 capitalize font-semibold ${orderStatusColor[status].textClass}`}
                            >
                                {orderStatusColor[status].label}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'Thanh toán',
                accessorKey: 'paymentMehod',
                cell: (props) => {
                    const { paymentMethod } = props.row.original
                    return (
                        <span className="flex items-center">
                            <PaymentMethodImage
                                className="max-h-[20px]"
                                paymentMethod={paymentMethod}
                            />
                        </span>
                    )
                },
            },
            {
                header: 'Thành tiền',
                accessorKey: 'totalAmount',
                cell: (props) => {
                    const { totalAmount } = props.row.original
                    return (
                        <NumericFormat
                            displayType="text"
                            value={(
                                Math.round(totalAmount * 100) / 100
                            ).toFixed(0)}
                            suffix={' VND'}
                            thousandSeparator={true}
                        />
                    )
                },
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

    const onRowSelect = (checked: boolean, row: Order) => {
        if (checked) {
            dispatch(addRowItem([row.id]))
        } else {
            dispatch(removeRowItem(row.id))
        }
    }

    const onAllRowSelect = useCallback(
        (checked: boolean, rows: Row<Order>[]) => {
            if (checked) {
                const originalRows = rows.map((row) => row.original)
                const selectedIds: string[] = []
                originalRows.forEach((row) => {
                    selectedIds.push(row.id)
                })
                dispatch(setSelectedRows(selectedIds))
            } else {
                dispatch(setSelectedRows([]))
            }
        },
        [dispatch]
    )

    return (
        <DataTable
            ref={tableRef}
            selectable
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
            onCheckBoxChange={onRowSelect}
            onIndeterminateCheckBoxChange={onAllRowSelect}
        />
    )
}

export default PaymentTable
