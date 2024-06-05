import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import IconText from '@/components/shared/IconText'
import { HiMail, HiPhone, HiExternalLink } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { extractPText, imagePath } from '@/utils/imagePath'
import { defaultImagePath, EStatus } from '@/constants/data.constant'
import { NumericFormat } from 'react-number-format'

type CustomerInfoProps = {
    data?: {
        id: string
        name: string
        email: string
        phone: string
        img: string
        previousOrder: number
        age: string
        fee: number
        reasons: string
        status: EStatus
        conclusion: string
    }
}

const CustomerInfo = ({ data }: CustomerInfoProps) => {
    return (
        <Card>
            <h5 className="mb-4">Bệnh nhân</h5>
            <span
                className="group flex items-center justify-between"
                // to="/app/crm/customer-details?id=11"
            >
                <div className="flex items-center">
                    <Avatar
                        shape="circle"
                        src={imagePath(data?.img || defaultImagePath)}
                    />
                    <div className="ltr:ml-2 rtl:mr-2">
                        <div className="font-semibold group-hover:text-gray-900 group-hover:dark:text-gray-100">
                            <Link to={`/patient-details?id=${data?.id}`}>
                                {data?.name}
                            </Link>
                        </div>
                        <span>
                            Đã khám
                            <span className="font-semibold">
                                {' '}
                                {data?.previousOrder}{' '}
                            </span>
                            lần trước đó
                        </span>
                    </div>
                </div>
                <HiExternalLink className="text-xl hidden group-hover:block" />
            </span>
            <hr className="my-5" />
            <div className="mb-4">
                <span className="font-semibold">Email: </span>
                <span>{data?.email}</span>
            </div>
            <div className="mb-4">
                <span className="font-semibold">Số Điện Thoại: </span>
                <span>{data?.phone}</span>
            </div>
            <div className="mb-4">
                <span className="font-semibold">Tuổi: </span>
                <span>{data?.age}</span>
            </div>
            <div className="mb-4">
                <span className="font-semibold">Giá Khám: </span>
                <span className="font-semibold">
                    <NumericFormat
                        displayType="text"
                        value={Math.round(data?.fee as number)}
                        thousandSeparator={true}
                    />{' '}
                    VND
                </span>
            </div>
            <hr className="my-5" />
            <h6 className="mb-4">Lý do thăm khám</h6>
            <address className="not-italic">{data?.reasons}</address>
            <hr className="my-5" />
            {/* Thêm phần kết luận dựa vào trạng thái của cuộc hẹn */}
            {data?.status === EStatus.COMPLETED && (
                <>
                    <h6 className="mb-4">Kết luận</h6>
                    <address className="not-italic">
                        {extractPText(data?.conclusion)}
                    </address>
                    <hr className="my-5" />
                </>
            )}
        </Card>
    )
}

export default CustomerInfo
