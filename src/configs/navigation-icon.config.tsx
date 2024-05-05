import { HiOutlineHome, HiOutlineUserGroup } from 'react-icons/hi'
import { GrUserManager } from 'react-icons/gr'
import { HiOutlineCalendarDays } from 'react-icons/hi2'
import { MdOutlinePayments } from 'react-icons/md'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    doctor: <GrUserManager />,
    patient: <HiOutlineUserGroup />,
    calender: <HiOutlineCalendarDays />,
    appointment: <HiOutlineUserGroup />,
    payment: <MdOutlinePayments />,
}

export default navigationIcon
