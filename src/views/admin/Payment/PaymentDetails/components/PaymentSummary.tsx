import Card from '@/components/ui/Card'
import { EPaymentType } from '@/constants/data.constant'
import { NumericFormat } from 'react-number-format'

type PaymentInfoProps = {
    label?: string
    value?: number | string
    isLast?: boolean
}

type PaymentSummaryProps = {
    data?: {
        subTotal: number
        paymentMethod: EPaymentType
        total: number
    }
}

const PaymentInfo = ({ label, value, isLast }: PaymentInfoProps) => {
    return (
        <li
            className={`flex items-center justify-between${
                !isLast ? ' mb-3' : ''
            }`}
        >
            <span>{label}</span>
            <span className="font-semibold">
                <NumericFormat
                    displayType="text"
                    value={Math.round(value as number)}
                    thousandSeparator={true}
                />{' '}
                VND
            </span>
        </li>
    )
}

const PaymentSummary = ({ data }: PaymentSummaryProps) => {
    return (
        <Card className="mb-4">
            <h5 className="mb-4">Chi tiết Thanh toán</h5>
            <ul>
                <PaymentInfo label="Giá khám" value={data?.subTotal} />
                <li className="flex items-center justify-between mb-3">
                    <span>Phương thức thanh toán</span>
                    <span className="font-semibold">
                        {data?.paymentMethod === EPaymentType.ONLINE
                            ? 'Online'
                            : 'Smartcard'}
                    </span>
                </li>
                <hr className="mb-3" />
                <PaymentInfo isLast label="Thành tiền" value={data?.total} />
            </ul>
        </Card>
    )
}

export default PaymentSummary
