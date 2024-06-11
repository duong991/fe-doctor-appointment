import Button from '@/components/ui/Button'
import DeletePaymentMethod from './DeletePaymentMethod'
import {
    openDeletePaymentMethodDialog,
    updateSelectedCard,
    useAppDispatch,
    useAppSelector,
    PaymentMethod,
    changeStatusSmartCard,
    closeSmartCardDialog,
    openSmartCardDialog,
} from '../store'
import isLastChild from '@/utils/isLastChild'
import classNames from 'classnames'
import { ConfirmDialog } from '@/components/shared'
import useQuery from '@/utils/hooks/useQuery'

const PaymentMethods = () => {
    const dispatch = useAppDispatch()
    const query = useQuery()
    const userId = query.get('id') as string
    const data = useAppSelector(
        (state) => state.crmCustomerDetails.data.paymentMethodData
    )
    const isOpenSmartCardDialog = useAppSelector(
        (state) => state.crmCustomerDetails.data.openSmartCardDialog
    )

    const onConfirmDialogClose = () => {
        dispatch(closeSmartCardDialog())
    }

    const handleOpenSmartCardDialog = () => {
        dispatch(openSmartCardDialog())
    }
    const handleConfirm = () => {
        dispatch(
            changeStatusSmartCard({
                userId,
                status: !data.isBlocked,
            })
        )
        dispatch
        dispatch(closeSmartCardDialog())
    }

    return (
        <>
            {data && data.id !== 0 && (
                <div>
                    <h6 className="mb-4">Phương thức thanh toán</h6>
                    <div className="rounded-lg border border-gray-200 dark:border-gray-600">
                        <div
                            className={classNames(
                                'flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-4',
                                data.isBlocked ? 'bg-red-200' : 'bg-green-200' // Change card color based on isBlock
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <img src="/img/others/img-8.png" alt="visa" />
                                <div>
                                    <div className="flex items-center">
                                        <div className="text-gray-900 dark:text-gray-100 font-semibold">
                                            {data.cardName}
                                        </div>
                                    </div>
                                    <span>
                                        Số dư{': '}
                                        {data.balance.toLocaleString()} VND
                                    </span>
                                </div>
                            </div>
                            <div className="flex">
                                {data.isBlocked ? (
                                    <Button
                                        className="mr-2 rtl:ml-2"
                                        variant="plain"
                                        size="sm"
                                        onClick={handleOpenSmartCardDialog}
                                    >
                                        Mở Thẻ
                                    </Button>
                                ) : (
                                    <Button
                                        className="mr-2 rtl:ml-2"
                                        variant="plain"
                                        size="sm"
                                        onClick={handleOpenSmartCardDialog}
                                    >
                                        Khóa thẻ
                                    </Button>
                                )}

                                <ConfirmDialog
                                    isOpen={isOpenSmartCardDialog}
                                    type="danger"
                                    title={
                                        !data.isBlocked ? 'Khoá thẻ' : 'Mở thẻ'
                                    }
                                    confirmButtonColor="red-600"
                                    onClose={onConfirmDialogClose}
                                    onRequestClose={onConfirmDialogClose}
                                    onCancel={onConfirmDialogClose}
                                    onConfirm={handleConfirm}
                                >
                                    {data.isBlocked ? (
                                        <p>
                                            Xác nhận mở khóa thẻ cho bệnh nhân
                                        </p>
                                    ) : (
                                        <p>Xác nhận khóa thẻ của bệnh nhân</p>
                                    )}
                                </ConfirmDialog>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* <EditPaymentMethod /> */}
            <DeletePaymentMethod />
        </>
    )
}

export default PaymentMethods
