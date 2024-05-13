import {
    updatePaymentMethodData,
    closeDeletePaymentMethodDialog,
    useAppDispatch,
    useAppSelector,
} from '../store'
import cloneDeep from 'lodash/cloneDeep'
import ConfirmDialog from '@/components/shared/ConfirmDialog'

const DeletePaymentMethod = () => {
    const dispatch = useAppDispatch()
    const data = useAppSelector(
        (state) => state.crmCustomerDetails.data.paymentMethodData
    )
    const dialogOpen = useAppSelector(
        (state) => state.crmCustomerDetails.data.deletePaymentMethodDialog
    )
    const selectedCard = useAppSelector(
        (state) => state.crmCustomerDetails.data.selectedCard
    )

    const onDelete = () => {
        let newData = null
        if (data && data.id !== selectedCard.id) {
            newData = cloneDeep(data)
        }
        dispatch(closeDeletePaymentMethodDialog())
        dispatch(updatePaymentMethodData(newData))
    }

    const onDialogClose = () => {
        dispatch(closeDeletePaymentMethodDialog())
    }

    return (
        <ConfirmDialog
            isOpen={dialogOpen}
            type="danger"
            title="Remove payment method"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p> Bạn có chắc chắn muốn xóa phương thức thanh toán này không? </p>
        </ConfirmDialog>
    )
}

export default DeletePaymentMethod
