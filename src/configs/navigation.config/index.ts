import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE,
} from '@/constants/navigation.constant'
import type { NavigationTree } from '@/@types/navigation'
import { Role } from '@/@types/enum'

const navigationConfig: NavigationTree[] = [
    /*
     * ADMIN NAVIGATION
     */
    {
        key: 'home',
        path: '/home',
        title: 'Home',
        translateKey: 'nav.home',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['admin'],
        subMenu: [],
    },
    {
        key: Role.DOCTOR,
        path: '/doctor',
        title: 'Bác sĩ',
        translateKey: 'nav.doctor',
        icon: Role.DOCTOR,
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['admin'],
        subMenu: [],
    },
    {
        key: 'patient',
        path: '/patient',
        title: 'Bệnh nhân',
        translateKey: 'nav.patient',
        icon: 'patient',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['admin'],
        subMenu: [],
    },
    {
        key: 'payment',
        path: '/payment',
        title: 'Thanh toán',
        translateKey: 'nav.payment',
        icon: 'payment',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['admin'],
        subMenu: [],
    },
    /*
     * DOCTOR NAVIGATION
     */
    {
        key: 'home_doctor',
        path: '/',
        title: 'Home',
        translateKey: 'nav.home',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [Role.DOCTOR],
        subMenu: [],
    },

    {
        key: 'appointment',
        path: '/appointment',
        title: 'Appointment',
        translateKey: 'nav.appointment',
        icon: 'appointment',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [Role.DOCTOR],
        subMenu: [],
    },
    {
        key: 'calender',
        path: '/calender',
        title: 'Calender',
        translateKey: 'nav.calender',
        icon: 'calender',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [Role.DOCTOR],
        subMenu: [],
    },
]

export default navigationConfig
