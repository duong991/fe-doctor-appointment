import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'
import { Role } from '@/@types/enum'
import commonRoutes from './commonRoute'

const adminRoutes: Routes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/admin/Dashboard/Dashboard')),
        authority: [Role.ADMIN],
    },
    {
        key: '/doctor',
        path: '/doctor',
        component: lazy(() => import('@/views/admin/Doctor/DoctorList')),
        authority: [Role.ADMIN],
    },
    {
        key: 'doctor.doctorNew',
        path: `/doctor/doctor-new`,
        component: lazy(() => import('@/views/admin/Doctor/DoctorNew')),
        authority: [Role.ADMIN],
        meta: {
            header: 'Thêm mới bác sĩ',
        },
    },
    {
        key: 'doctor.editDoctor',
        path: `/doctor/doctor-edit/:doctorId`,
        component: lazy(() => import('@/views/admin/Doctor/DoctorEdit')),
        authority: [Role.ADMIN],
        meta: {
            header: 'Edit Doctor',
        },
    },
    {
        key: '/doctor-info',
        path: '/doctor',
        component: lazy(() => import('@/views/doctor/Calendar/Calendar')),
        authority: [Role.ADMIN],
    },
    {
        key: 'patient',
        path: '/patient',
        component: lazy(() => import('@/views/admin/Customers')),
        authority: [Role.ADMIN],
    },
    {
        key: 'patient-details',
        path: '/patient-details',
        component: lazy(() => import('@/views/admin/CustomerDetail')),
        authority: [Role.ADMIN],
    },
    {
        key: 'payment',
        path: '/payment',
        component: lazy(() => import('@/views/admin/Payment/PaymentList')),
        authority: [Role.ADMIN],
    },

    {
        key: 'payment-details',
        path: '/payment/details/:paymentId',
        component: lazy(() => import('@/views/admin/Payment/PaymentDetails')),
        authority: [Role.ADMIN],
    },

    {
        key: 'appointment',
        path: '/appointment/create',
        component: lazy(() => import('@/views/admin/CreateCalendar')),
        authority: [Role.ADMIN],
    },
]

export const doctorRoutes: Routes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/doctor/Dashboard')),
        authority: [Role.DOCTOR],
    },
    {
        key: 'calender',
        path: '/calender',
        component: lazy(() => import('@/views/doctor/Calendar/Calendar')),
        authority: [Role.DOCTOR],
    },
    {
        key: 'appointment',
        path: '/appointment',
        component: lazy(
            () => import('@/views/doctor/Appointment/AppointmentList')
        ),
        authority: [Role.DOCTOR],
    },
    {
        key: 'appointment-detail',
        path: '/appointment-detail/:orderId',
        component: lazy(
            () => import('@/views/doctor/Appointment/OrderDetails')
        ),
        authority: [Role.DOCTOR],
    },

    {
        key: 'room',
        path: '/room',
        component: lazy(() => import('@/views/doctor/Room')),
        authority: [Role.DOCTOR],
        meta: {
            layout: 'blank',
            pageContainerType: 'gutterless',
            footer: false,
        },
    },

    // {
    //     key: 'appointment',
    //     path: '/appointment',
    //     component: lazy(() => import('@/views/admin/Appointments')),
    //     authority: [],
    // },
]

export const publicRoutes: Routes = [...authRoute]
export const protectedAdminRoutes: Routes = [...adminRoutes]
export const protectedDoctorRoutes: Routes = [...doctorRoutes]
