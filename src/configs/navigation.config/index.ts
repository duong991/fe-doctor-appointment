import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE,
} from '@/constants/navigation.constant'
import type { NavigationTree } from '@/@types/navigation'

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
        key: 'doctor',
        path: '/doctor',
        title: 'Bác sĩ',
        translateKey: 'nav.doctor',
        icon: 'doctor',
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
        authority: ['doctor'],
        subMenu: [],
    },
    {
        key: 'calender',
        path: '/calender',
        title: 'Calender',
        translateKey: 'nav.calender',
        icon: 'calender',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['doctor'],
        subMenu: [],
    },
]

export default navigationConfig
