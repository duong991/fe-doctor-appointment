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

const months = [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
]
const PaymentMethods = () => {
    const dispatch = useAppDispatch()

    const data = useAppSelector(
        (state) => state.crmCustomerDetails.data.paymentMethodData
    )

    const onDeletePaymentMethodDialogOpen = (card: PaymentMethod) => {
        dispatch(updateSelectedCard(card))
        dispatch(openDeletePaymentMethodDialog())
    }

    return (
        <>
            {data.length > 0 && (
                <div>
                    <h6 className="mb-4">Payment Methods</h6>
                    <div className="rounded-lg border border-gray-200 dark:border-gray-600">
                        {data.map((card, index) => (
                            <div
                                key={card.last4Number}
                                className={classNames(
                                    'flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-4',
                                    !isLastChild(data, index) &&
                                        'border-b border-gray-200 dark:border-gray-600'
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src="/img/others/img-8.png"
                                        alt="visa"
                                    />
                                    <div>
                                        <div className="flex items-center">
                                            <div className="text-gray-900 dark:text-gray-100 font-semibold">
                                                {card.cardHolderName}
                                            </div>
                                        </div>
                                        <span>
                                            Hết hạn{': '}
                                            {
                                                months[
                                                    parseInt(card.expMonth) - 1
                                                ]
                                            }{' '}
                                            20
                                            {card.expYear}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex">
                                    <Button
                                        className="mr-2 rtl:ml-2"
                                        variant="plain"
                                        size="sm"
                                        onClick={() =>
                                            onDeletePaymentMethodDialogOpen(
                                                card
                                            )
                                        }
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {/* <EditPaymentMethod /> */}
            <DeletePaymentMethod />
        </>
    )
}

export default PaymentMethods
