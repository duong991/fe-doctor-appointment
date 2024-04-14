import {
    HiOutlineColorSwatch,
    HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineHome,
    HiOutlineUserGroup,
} from 'react-icons/hi'
import { FaUserDoctor } from 'react-icons/fa6'
import { GrUserManager } from 'react-icons/gr'
import { HiOutlineCalendarDays } from 'react-icons/hi2'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    doctor: <GrUserManager />,
    patient: <HiOutlineUserGroup />,
    calender: <HiOutlineCalendarDays />,
    appointment: <HiOutlineCalendarDays />,
    singleMenu: <HiOutlineViewGridAdd />,
    collapseMenu: <HiOutlineTemplate />,
    groupSingleMenu: <HiOutlineDesktopComputer />,
    groupCollapseMenu: <HiOutlineColorSwatch />,
}

export default navigationIcon
