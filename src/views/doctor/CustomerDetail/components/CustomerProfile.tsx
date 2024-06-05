import { useState } from 'react'
import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import {
    deleteCustomer,
    openEditCustomerDetailDialog,
    useAppDispatch,
    Customer,
} from '../store'
import { imagePath } from '@/utils/imagePath'
import { defaultImagePath } from '@/constants/data.constant'
import dayjs from 'dayjs'

type CustomerInfoFieldProps = {
    title?: string
    value?: string
}

type CustomerProfileProps = {
    data?: Partial<Customer>
}

const CustomerInfoField = ({ title, value }: CustomerInfoFieldProps) => {
    return (
        <div>
            <span>{title}</span>
            <p className="text-gray-700 dark:text-gray-200 font-semibold">
                {value}
            </p>
        </div>
    )
}

const CustomerProfileAction = ({ id }: { id?: string }) => {
    const dispatch = useAppDispatch()
    const [dialogOpen, setDialogOpen] = useState(false)

    const navigate = useNavigate()

    const onDialogClose = () => {
        setDialogOpen(false)
    }

    const onDialogOpen = () => {
        setDialogOpen(true)
    }

    const onDelete = () => {
        setDialogOpen(false)
        if (id) {
            dispatch(deleteCustomer({ id }))
        }
        navigate('/app/crm/customers')
        toast.push(
            <Notification title={'Successfuly Deleted'} type="success">
                Xóa khách hàng thành công
            </Notification>
        )
    }

    const onEdit = () => {
        dispatch(openEditCustomerDetailDialog())
    }

    return (
        <>
            <Button block icon={<HiOutlineTrash />} onClick={onDialogOpen}>
                Xóa
            </Button>
            <Button
                block
                icon={<HiPencilAlt />}
                variant="solid"
                onClick={onEdit}
            >
                Chỉnh sửa
            </Button>
            <ConfirmDialog
                isOpen={dialogOpen}
                type="danger"
                title="Xóa khách hàng"
                confirmButtonColor="red-600"
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
                onCancel={onDialogClose}
                onConfirm={onDelete}
            >
                <p>
                    Bạn có chắc chắn muốn xóa khách hàng này không? Tất cả các
                    bản ghi liên quan đến khách hàng này cũng sẽ bị xóa. Hành
                    động này không thể hoàn tác.
                </p>
            </ConfirmDialog>
            {/* <EditCustomerProfile /> */}
        </>
    )
}

const CustomerProfile = ({ data = {} }: CustomerProfileProps) => {
    return (
        <Card>
            <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                <div className="flex xl:flex-col items-center gap-4">
                    <Avatar
                        size={90}
                        shape="circle"
                        src={imagePath(data.img || defaultImagePath)}
                    />
                    <h4 className="font-bold">{data.name}</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4 mt-8">
                    <CustomerInfoField title="Email" value={data.email} />
                    <CustomerInfoField
                        title="Số điện thoại"
                        value={data.phone}
                    />
                    <CustomerInfoField title="Địa chỉ" value={data.address} />
                    <CustomerInfoField
                        title="Ngày sinh"
                        value={dayjs(data.dob).format('DD/MM/YYYY')}
                    />
                </div>
                <div className="mt-4 flex flex-col xl:flex-row gap-2">
                    {/* <CustomerProfileAction id={data.id} /> */}
                </div>
            </div>
        </Card>
    )
}

export default CustomerProfile
