import AdaptableCard from '@/components/shared/AdaptableCard'
import Table from '@/components/ui/Table'
import Avatar from '@/components/ui/Avatar'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table'
import { NumericFormat } from 'react-number-format'
import { imagePath } from '@/utils/imagePath'

type Doctor = {
    id: string
    name: string
    img: string
    price: number
    service: string
    total: number
}

type OrderProductsProps = {
    data?: Doctor[]
}

const { Tr, Th, Td, THead, TBody } = Table

const columnHelper = createColumnHelper<Doctor>()

const ProductColumn = ({ row }: { row: Doctor }) => {
    return (
        <div className="flex items-center">
            <Avatar size={90} src={imagePath(row.img)} />
            <div className="ltr:ml-2 rtl:mr-2">
                <h6 className="mb-2">{row.name}</h6>
                {/* {Object.keys(row.details).map((key, i) => (
                    <div key={key + i} className="mb-1">
                        <span className="capitalize">{key}: </span>
                        {row.details[key].map((item, j) => (
                            <Fragment key={item + j}>
                                <span className="font-semibold">{item}</span>
                                {!isLastChild(row.details[key], j) && (
                                    <span>, </span>
                                )}
                            </Fragment>
                        ))}
                    </div>
                ))} */}
            </div>
        </div>
    )
}

const PriceAmount = ({ amount }: { amount: number }) => {
    return (
        <NumericFormat
            displayType="text"
            value={Math.round(amount as number)}
            suffix={' VND'}
            thousandSeparator={true}
        />
    )
}

const columns = [
    columnHelper.accessor('name', {
        header: 'Bác sĩ',
        cell: (props) => {
            const row = props.row.original
            return <ProductColumn row={row} />
        },
    }),
    columnHelper.accessor('price', {
        header: 'Giá khám',
        cell: (props) => {
            const row = props.row.original
            return <PriceAmount amount={row.price} />
        },
    }),
    columnHelper.accessor('service', {
        header: 'Dịch vụ',
    }),
    columnHelper.accessor('total', {
        header: 'Tổng tiền',
        cell: (props) => {
            const row = props.row.original
            return <PriceAmount amount={row.price} />
        },
    }),
]

const OrderProducts = ({ data = [] }: OrderProductsProps) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <AdaptableCard className="mb-4">
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
        </AdaptableCard>
    )
}

export default OrderProducts
