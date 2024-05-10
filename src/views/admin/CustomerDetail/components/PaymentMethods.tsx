import Button from '@/components/ui/Button'
import DeletePaymentMethod from './DeletePaymentMethod'
import {
    openDeletePaymentMethodDialog,
    updateSelectedCard,
    useAppDispatch,
    useAppSelector,
    PaymentMethod,
} from '../store'
import isLastChild from '@/utils/isLastChild'
import classNames from 'classnames'
const PaymentMethods = () => {
    const dispatch = useAppDispatch()

    const data = useAppSelector(
        (state) => state.crmCustomerDetails.data.paymentMethodData
    )

    const onDeletePaymentMethodDialogOpen = (card: PaymentMethod) => {
        dispatch(updateSelectedCard(card))
        dispatch(openDeletePaymentMethodDialog())
    }

    const onBlockPaymentMethodDialogOpen = (card: PaymentMethod) => {
        console.log('Block card:', card)
    }

    const onUnblockPaymentMethodDialogOpen = (card: PaymentMethod) => {
        console.log('Unblock card:', card)
    }

    return (
        <>
            {data && (
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
                                        onClick={() =>
                                            onUnblockPaymentMethodDialogOpen(
                                                data
                                            )
                                        }
                                    >
                                        Mở Thẻ
                                    </Button>
                                ) : (
                                    <Button
                                        className="mr-2 rtl:ml-2"
                                        variant="plain"
                                        size="sm"
                                        onClick={() =>
                                            onBlockPaymentMethodDialogOpen(data)
                                        }
                                    >
                                        Khóa thẻ
                                    </Button>
                                )}
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
