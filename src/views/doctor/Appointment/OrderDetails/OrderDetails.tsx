import { useState, useEffect } from 'react'
import classNames from 'classnames'
import Tag from '@/components/ui/Tag'
import Loading from '@/components/shared/Loading'
import Container from '@/components/shared/Container'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import OrderProducts from './components/OrderProducts'
import PaymentSummary from './components/PaymentSummary'
import ShippingInfo from './components/ShippingInfo'
import Activity from './components/Activity'
import CustomerInfo from './components/CustomerInfo'
import { HiOutlineCalendar } from 'react-icons/hi'
import { apiGetAppointmentDetails } from '@/services/SalesService'
import { useLocation } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import dayjs from 'dayjs'
import { EPaymentStatus, EStatus } from '@/constants/data.constant'

dayjs.locale('vi')

type AppointmentDetailsResponse = {
    id?: string
    progressStatus?: EStatus
    dateTime?: string
    customer?: {
        id: string
        name: string
        email: string
        phone: string
        img: string
        previousOrder: number
        age: string
        fee: number
        reasons: string
    }
}

type PaymentStatus = {
    label: string
    class: string
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

const OrderDetails = () => {
    const location = useLocation()

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<AppointmentDetailsResponse>({})

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
                AppointmentDetailsResponse,
                { id: string }
            >({ id })
            if (response) {
                setLoading(false)
                setData(response.data.data)
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
                                        #
                                        {data.id
                                            ?.substring(0, 8)
                                            .toLocaleUpperCase()}
                                    </span>
                                    <Tag
                                        className={classNames(
                                            'border-0 rounded-md ltr:ml-2 rtl:mr-2',
                                            progressStatus[
                                                data.progressStatus! ||
                                                    EPaymentStatus.PENDING
                                            ].class
                                        )}
                                    >
                                        {
                                            progressStatus[
                                                data.progressStatus! ||
                                                    EPaymentStatus.PENDING
                                            ].label
                                        }
                                    </Tag>
                                </h3>
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
                        <div className="w-full items-center">
                            <CustomerInfo data={data.customer} />
                        </div>
                    </>
                )}
            </Loading>
            {!loading && isEmpty(data) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="Không tìm thấy lịch hẹn"
                    />
                    <h3 className="mt-8">Không tìm thấy lịch hẹn nào!</h3>
                </div>
            )}
        </Container>
    )
}

export default OrderDetails
