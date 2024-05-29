import { useCallback, useEffect, useMemo, useRef } from 'react'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { FiPackage } from 'react-icons/fi'
import {
    getProducts,
    setTableData,
    setSelectedProduct,
    toggleDeleteConfirmation,
    useAppDispatch,
    useAppSelector,
    setSelectedRows,
    addRowItem,
    removeRowItem,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import DoctorDeleteConfirmation from './DoctorDeleteConfirmation'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
    Row,
} from '@/components/shared/DataTable'
import { imagePath } from '@/utils/imagePath'
import { specialists } from '@/constants/data.constant'
import { FaRegCalendarCheck } from 'react-icons/fa'
import { NumericFormat } from 'react-number-format'

type Doctor = {
    id: string
    name: string
    revenue: number
    email: string
    img: string
    averageRating: number
    specialist: string
    onlinePrice: number
    offlinePrice: number
}

const ActionColumn = ({ row }: { row: Doctor }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/doctor/doctor-edit/${row.id}`)
    }

    const onViewCalender = () => {
        navigate(`/doctor/doctor-calender/${row.id}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedProduct(row.id))
    }

    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onViewCalender}
            >
                <FaRegCalendarCheck />
            </span>
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
            >
                <HiOutlinePencil />
            </span>
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onDelete}
            >
                <HiOutlineTrash />
            </span>
        </div>
    )
}

const DoctorColumn = ({ row }: { row: Doctor }) => {
    const avatar = row.img ? (
        <Avatar src={imagePath(row.img)} />
    ) : (
        <Avatar icon={<FiPackage />} />
    )

    return (
        <div className="flex items-center">
            {avatar}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.name}</span>
        </div>
    )
}

const DoctorTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.doctorList.data.tableData
    )

    const filterData = useAppSelector(
        (state) => state.doctorList.data.filterData
    )

    const loading = useAppSelector((state) => state.doctorList.data.loading)

    const data = useAppSelector((state) => state.doctorList.data.doctorList)

    useEffect(() => {
        dispatch(setSelectedRows([]))
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSorting()
        }
    }, [filterData])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const fetchData = () => {
        dispatch(getProducts({ pageIndex, pageSize, sort, query, filterData }))
    }

    const columns: ColumnDef<Doctor>[] = useMemo(
        () => [
            {
                header: 'Tên',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <DoctorColumn row={row} />
                },
            },
            {
                header: 'Email',
                accessorKey: 'email',
                cell: (props) => {
                    const row = props.row.original
                    return <span>{row.email}</span>
                },
            },
            {
                header: 'Doanh thu',
                accessorKey: 'revenue',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span>
                            <NumericFormat
                                thousandSeparator
                                displayType="text"
                                value={row.revenue}
                                suffix=" VND"
                            />
                        </span>
                    )
                },
            },
            {
                header: 'Chuyên khoa',
                accessorKey: 'specialist',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className="capitalize">
                            {specialists.filter(
                                (specialist) =>
                                    specialist.value === row.specialist &&
                                    specialist.label
                            )[0]?.label || ''}
                            {row.specialist}
                        </span>
                    )
                },
            },
            {
                header: 'Đánh giá',
                accessorKey: 'averageRating',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="rounded-md font-bold cursor-pointer select-none text-gray-900 dark:text-gray-100">
                            <span className="ml-2 rtl:mr-2 capitalize">
                                {row.averageRating}
                            </span>
                        </div>
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

    const onRowSelect = (checked: boolean, row: Doctor) => {
        if (checked) {
            dispatch(addRowItem([row.id]))
        } else {
            dispatch(removeRowItem(row.id))
        }
    }

    const onAllRowSelect = useCallback(
        (checked: boolean, rows: Row<Doctor>[]) => {
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
        <>
            <DataTable
                ref={tableRef}
                selectable
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
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
            <DoctorDeleteConfirmation />
        </>
    )
}

export default DoctorTable
