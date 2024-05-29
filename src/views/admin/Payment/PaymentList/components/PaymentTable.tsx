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
import {
    EPaymentStatus,
    EPaymentType,
    EStatus,
} from '@/constants/data.constant'

type PaymentDetail = {
    id: string
    scheduleDate: string
    patientName: string
    status: EPaymentStatus
    paymentMethod: EPaymentType
    totalAmount: number
}

const paymentStatusColor: Record<
    EPaymentStatus,
    {
        label: string
        dotClass: string
        textClass: string
    }
> = {
    [EPaymentStatus.PENDING]: {
        label: 'Đang chờ',
        dotClass: 'bg-yellow-500',
        textClass: 'text-yellow-500',
    },
    [EPaymentStatus.SUCCESS]: {
        label: 'Thành công',
        dotClass: 'bg-green-500',
        textClass: 'text-green-500',
    },
    [EPaymentStatus.FAILED]: {
        label: 'Thất bại',
        dotClass: 'bg-red-500',
        textClass: 'text-red-500',
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
                    src="/img/others/img-9.png"
                    alt={paymentMethod}
                />
            )
        case 'SMARTCARD':
            return (
                <img
                    className={className}
                    src="/img/others/img-8.png"
                    alt={paymentMethod}
                />
            )
        default:
            return <></>
    }
}

const PaymentColumn = ({ row }: { row: PaymentDetail }) => {
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
            #{shortId.toLocaleUpperCase()}
        </span>
    )
}

const ActionColumn = ({ row }: { row: PaymentDetail }) => {
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
            <Tooltip title="Xem chi tiết">
                <span
                    className={`cursor-pointer p-2 hover:${textTheme}`}
                    onClick={onView}
                >
                    <HiOutlineEye />
                </span>
            </Tooltip>
            <Tooltip title="Xóa">
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

    const columns: ColumnDef<PaymentDetail>[] = useMemo(
        () => [
            {
                header: 'Mã Số',
                accessorKey: 'id',
                cell: (props) => <PaymentColumn row={props.row.original} />,
            },
            {
                header: 'Ngày Khám',
                accessorKey: 'scheduleDate',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span>
                            {dayjs(row.scheduleDate, 'YYYY-MM-DD').format(
                                'DD/MM/YYYY'
                            )}
                        </span>
                    )
                },
            },
            {
                header: 'Người Khám',
                accessorKey: 'patientName',
            },
            {
                header: 'Trạng thái',
                accessorKey: 'status',
                cell: (props) => {
                    const { status } = props.row.original
                    return (
                        <div className="flex items-center">
                            <Badge
                                className={paymentStatusColor[status].dotClass}
                            />
                            <span
                                className={`ml-2 rtl:mr-2 capitalize font-semibold ${paymentStatusColor[status].textClass}`}
                            >
                                {paymentStatusColor[status].label}
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
                        <div className="flex items-center justify-center">
                            <PaymentMethodImage
                                className="max-h-[40px]"
                                paymentMethod={paymentMethod}
                            />
                        </div>
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

    const onRowSelect = (checked: boolean, row: PaymentDetail) => {
        if (checked) {
            dispatch(addRowItem([row.id]))
        } else {
            dispatch(removeRowItem(row.id))
        }
    }

    const onAllRowSelect = useCallback(
        (checked: boolean, rows: Row<PaymentDetail>[]) => {
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
