import { useState, useEffect } from 'react'
import classNames from 'classnames'
import Tag from '@/components/ui/Tag'
import Loading from '@/components/shared/Loading'
import Container from '@/components/shared/Container'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import OrderProducts from './components/OrderProducts'
import PaymentSummary from './components/PaymentSummary'
import CustomerInfo from './components/CustomerInfo'
import { HiOutlineCalendar } from 'react-icons/hi'
import { apiGetAppointmentDetails } from '@/services/DoctorService'
import { useLocation } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import {
    EPaymentStatus,
    EPaymentType,
    EStatus,
} from '@/constants/data.constant'

dayjs.locale('vi')

type SalesOrderDetailsResponse = {
    id?: string
    progressStatus?: EStatus
    paymentStatus?: EPaymentStatus
    dateTime?: string
    paymentSummary?: {
        subTotal: number
        paymentMethod: EPaymentType
        total: number
    }
    product?: {
        id: string
        name: string
        img: string
        price: number
        quantity: string
        total: number
    }[]
    customer?: {
        name: string
        email: string
        phone: string
        img: string
        previousOrder: number
    }
}

type PaymentStatus = {
    label: string
    class: string
}

const paymentStatus: Record<EPaymentStatus, PaymentStatus> = {
    PENDING: {
        label: 'đang chờ',
        class: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-100',
    },
    SUCCESS: {
        label: 'Thành công',
        class: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100',
    },
    FAILED: {
        label: 'Thất bại',
        class: 'text-red-500 bg-red-100 dark:text-red-100 dark:bg-red-500/20',
    },
}
const progressStatus: Record<EStatus, PaymentStatus> = {
    APPROVED: {
        label: 'Đã chấp thuận',
        class: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100',
    },
    REJECTED: {
        label: 'Đã từ chối',
        class: 'text-red-500 bg-red-100 dark:text-red-100 dark:bg-red-500/20',
    },
    CANCELLED: {
        label: 'Đã hủy',
        class: 'text-amber-600 bg-amber-100 dark:text-amber-100 dark:bg-amber-500/20',
    },
    COMPLETED: {
        label: 'Đã hoàn thành',
        class: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-100',
    },
    AWAITING_PAYMENT: {
        label: 'Đang chờ thanh toán',
        class: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-100',
    },
}

const PaymentDetails = () => {
    const location = useLocation()

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<SalesOrderDetailsResponse>({})

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = async () => {
        const id = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        if (id) {
            setLoading(true)
            const response = await apiGetAppointmentDetails<
                SalesOrderDetailsResponse,
                { id: string }
            >({ id })
            if (response) {
                setLoading(false)
                setData(response.data.data)
                //call thật thì .data
            }
        }
    }

    return (
        <Container className="h-full">
            <Loading loading={loading}>
                {!isEmpty(data) && (
                    <>
                        <div className="mb-6">
                            <div className="flex items-center mb-2">
                                <h3>
                                    <span>Lịch hẹn</span>
                                    <span className="ltr:ml-2 rtl:mr-2">
                                        #{data.id?.substring(0, 8)}
                                    </span>
                                </h3>
                                <Tag
                                    className={classNames(
                                        'border-0 rounded-md ltr:ml-2 rtl:mr-2',
                                        paymentStatus[
                                            data.paymentStatus ||
                                                EPaymentStatus.PENDING
                                        ].class
                                    )}
                                >
                                    {
                                        paymentStatus[
                                            data.paymentStatus ||
                                                EPaymentStatus.PENDING
                                        ].label
                                    }
                                </Tag>
                                <Tag
                                    className={classNames(
                                        'border-0 rounded-md ltr:ml-2 rtl:mr-2',
                                        progressStatus[
                                            data.progressStatus ||
                                                EStatus.APPROVED
                                        ].class
                                    )}
                                >
                                    {
                                        progressStatus[
                                            data.progressStatus ||
                                                EStatus.APPROVED
                                        ].label
                                    }
                                </Tag>
                            </div>
                            <span className="flex items-center">
                                <HiOutlineCalendar className="text-lg" />
                                <span className="ltr:ml-1 rtl:mr-1">
                                    {dayjs(data.dateTime).format(
                                        'ddd DD-MMM-YYYY, HH:mm'
                                    )}
                                </span>
                            </span>
                        </div>
                        <div className="xl:flex gap-4">
                            <div className="w-full">
                                <OrderProducts data={data.product} />
                                <div className="xl:grid grid-cols-2 gap-4">
                                    <PaymentSummary
                                        data={data.paymentSummary}
                                    />
                                </div>
                            </div>
                            <div className="xl:max-w-[360px] w-full">
                                <CustomerInfo data={data.customer} />
                            </div>
                        </div>
                    </>
                )}
            </Loading>
            {!loading && isEmpty(data) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No order found!"
                    />
                    <h3 className="mt-8">Không tìm thấy lịch hẹn nào</h3>
                </div>
            )}
        </Container>
    )
}

export default PaymentDetails
