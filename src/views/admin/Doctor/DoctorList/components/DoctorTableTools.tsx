import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import DoctorTableSearch from './DoctorTableSearch'
import DoctorFilter from './DoctorFilter'
import { Link } from 'react-router-dom'

const DoctorTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <DoctorTableSearch />
            <DoctorFilter />
            <Link
                download
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/product-list.csv"
                target="_blank"
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Tải xuông
                </Button>
            </Link>
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/doctor/doctor-new"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Thêm mới Bác sĩ
                </Button>
            </Link>
        </div>
    )
}

export default DoctorTableTools
