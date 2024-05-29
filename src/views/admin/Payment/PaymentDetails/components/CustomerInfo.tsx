import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import IconText from '@/components/shared/IconText'
import { HiMail, HiPhone, HiExternalLink } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { imagePath } from '@/utils/imagePath'
import { defaultImagePath } from '@/constants/data.constant'

type CustomerInfoProps = {
    data?: {
        id: string
        name: string
        email: string
        phone: string
        img: string
        previousOrder: number
    }
}

const CustomerInfo = ({ data }: CustomerInfoProps) => {
    return (
        <Card>
            <h5 className="mb-4">Khách hàng</h5>
            <Link
                className="group flex items-center justify-between"
                to={`/patient-details?id=${data?.id}`}
            >
                <div className="flex items-center">
                    <Avatar
                        shape="circle"
                        src={imagePath(data?.img || defaultImagePath)}
                    />
                    <div className="ltr:ml-2 rtl:mr-2">
                        <div className="font-semibold group-hover:text-gray-900 group-hover:dark:text-gray-100">
                            {data?.name}
                        </div>
                        <span>
                            <span className="font-semibold">
                                {data?.previousOrder}{' '}
                            </span>
                            lần đến khám
                        </span>
                    </div>
                </div>
                <HiExternalLink className="text-xl hidden group-hover:block" />
            </Link>
            <hr className="my-5" />
            <IconText
                className="mb-4"
                icon={<HiMail className="text-xl opacity-70" />}
            >
                <span className="font-semibold">{data?.email}</span>
            </IconText>
            <IconText icon={<HiPhone className="text-xl opacity-70" />}>
                <span className="font-semibold">{data?.phone}</span>
            </IconText>
        </Card>
    )
}

export default CustomerInfo
