import Select from '@/components/ui/Select'
import Badge from '@/components/ui/Badge'
import { setFilterData, useAppDispatch, useAppSelector } from '../store'
import {
    components,
    ControlProps,
    OptionProps,
    SingleValue,
} from 'react-select'
import { HiCheck } from 'react-icons/hi'

type Option = {
    value: string
    label: string
    color: string
}

const { Control } = components

const options: Option[] = [
    { value: '', label: 'All', color: 'bg-gray-500' },
    { value: 'NONE', label: 'None', color: 'bg-gray-500' },
    { value: 'PUBLISH', label: 'Publish', color: 'bg-green-500' },
    { value: 'BLOCKED', label: 'Blocked', color: 'bg-red-500' },
    { value: 'PENDING', label: 'Pending', color: 'bg-yellow-500' },
]

const CustomSelectOption = ({
    innerProps,
    label,
    data,
    isSelected,
}: OptionProps<Option>) => {
    return (
        <div
            className={`flex items-center justify-between p-2 cursor-pointer ${
                isSelected
                    ? 'bg-gray-100 dark:bg-gray-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
            {...innerProps}
        >
            <div className="flex items-center gap-2">
                <Badge innerClass={data.color} />
                <span>{label}</span>
            </div>
            {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
        </div>
    )
}

const CustomControl = ({ children, ...props }: ControlProps<Option>) => {
    const selected = props.getValue()[0]
    return (
        <Control {...props}>
            {selected && (
                <Badge
                    className="ltr:ml-4 rtl:mr-4"
                    innerClass={selected.color}
                />
            )}
            {children}
        </Control>
    )
}

const CustomerTableFilter = () => {
    const dispatch = useAppDispatch()

    const { smartCardStatus } = useAppSelector(
        (state) => state.crmCustomers.data.filterData
    )

    const onStatusFilterChange = (selected: SingleValue<Option>) => {
        dispatch(setFilterData({ smartCardStatus: selected?.value }))
    }

    return (
        <Select<Option>
            options={options}
            size="sm"
            className="mb-4 min-w-[130px]"
            components={{
                Option: CustomSelectOption,
                Control: CustomControl,
            }}
            value={options.filter((option) => option.value === smartCardStatus)}
            onChange={onStatusFilterChange}
        />
    )
}

export default CustomerTableFilter
