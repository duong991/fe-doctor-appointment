import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    setDeleteMode,
    setSelectedRow,
    setSelectedRows,
    deleteOrders,
    getOrders,
    useAppDispatch,
    useAppSelector,
} from '../store'

const OrderDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const selectedRows = useAppSelector(
        (state) => state.salesOrderList.data.selectedRows
    )
    const selectedRow = useAppSelector(
        (state) => state.salesOrderList.data.selectedRow
    )
    const deleteMode = useAppSelector(
        (state) => state.salesOrderList.data.deleteMode
    )
    const tableData = useAppSelector(
        (state) => state.salesOrderList.data.tableData
    )

    const onDialogClose = () => {
        dispatch(setDeleteMode(''))

        if (deleteMode === 'single') {
            dispatch(setSelectedRow([]))
        }
    }

    const onDelete = async () => {
        dispatch(setDeleteMode(''))

        if (deleteMode === 'single') {
            const success = await deleteOrders({ id: selectedRow })
            deleteSucceed(success)
            dispatch(setSelectedRow([]))
        }

        if (deleteMode === 'batch') {
            const success = await deleteOrders({ id: selectedRows })
            deleteSucceed(success, selectedRows.length)
            dispatch(setSelectedRows([]))
        }
    }

    const deleteSucceed = (success: boolean, orders = 0) => {
        if (success) {
            dispatch(getOrders(tableData))
            toast.push(
                <Notification
                    title={'Successfuly'}
                    type="success"
                    duration={2500}
                >
                    Xác nhận hoàn thành lịch hẹn
                    {deleteMode === 'single' && 'Order '}
                    {deleteMode === 'batch' && ` ${orders}  `}
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    return (
        <ConfirmDialog
            isOpen={deleteMode === 'single' || deleteMode === 'batch'}
            type="success"
            title="Xác nhận hoàn thành lịch hẹn"
            confirmButtonColor="green-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>Hãy chắc chắn bạn đã hoàn thành khám bệnh với bệnh nhân</p>
        </ConfirmDialog>
    )
}

export default OrderDeleteConfirmation
