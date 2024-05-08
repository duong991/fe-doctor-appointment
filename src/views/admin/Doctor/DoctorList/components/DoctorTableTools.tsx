import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle, HiOutlineTrash } from 'react-icons/hi'
import DoctorTableSearch from './DoctorTableSearch'
import DoctorFilter from './DoctorFilter'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../store'
import { MdAddChart } from 'react-icons/md'

const RegisterScheduleButton = ({
    selectedRows,
}: {
    selectedRows: string[]
}) => {
    const navigate = useNavigate()

    const onRegisterSchedule = () => {
        // dispatch(setDeleteMode('batch'))
        navigate('/appointment/create', { state: { selectedRows } })
    }

    return (
        <Button
            className="m-2"
            variant="solid"
            color="green-600"
            size="sm"
            icon={<MdAddChart />}
            onClick={onRegisterSchedule}
        >
            Đăng ký lịch khám bệnh cho bác sĩ
        </Button>
    )
}

const DoctorTableTools = () => {
    const selectedRows = useAppSelector(
        (state) => state.doctorList.data.selectedRows
    )

    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            {selectedRows.length > 0 && (
                <RegisterScheduleButton selectedRows={selectedRows} />
            )}
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
                className="block lg:inline-block md:mb-0 mb-4 md:mx-2"
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
