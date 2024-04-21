import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

const adminRoutes: Routes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/admin/Dashboard/Dashboard')),
        authority: ['admin'],
    },
    {
        key: '/doctor',
        path: '/doctor',
        component: lazy(() => import('@/views/admin/Doctor/DoctorList')),
        authority: ['admin'],
    },
    {
        key: 'doctor.doctorNew',
        path: `/doctor/doctor-new`,
        component: lazy(() => import('@/views/admin/Doctor/DoctorNew')),
        authority: ['admin'],
        meta: {
            header: 'Thêm mới bác sĩ',
        },
    },
    {
        key: 'doctor.editDoctor',
        path: `/doctor/doctor-edit/:doctorId`,
        component: lazy(() => import('@/views/admin/Doctor/DoctorEdit')),
        authority: ['admin'],
        meta: {
            header: 'Edit Doctor',
        },
    },
    {
        key: '/doctor-info',
        path: '/doctor',
        component: lazy(() => import('@/views/doctor/Calendar/Calendar')),
        authority: ['admin'],
    },
    {
        key: 'patient',
        path: '/patient',
        component: lazy(() => import('@/views/admin/Customers')),
        authority: ['admin'],
    },
    {
        key: 'payment',
        path: '/payment',
        component: lazy(() => import('@/views/admin/Payment/PaymentList')),
        authority: ['admin'],
    },

    {
        key: 'payment-details',
        path: '/payment/details/:paymentId',
        component: lazy(() => import('@/views/admin/Payment/PaymentDetails')),
        authority: ['admin'],
    },
]

export const doctorRoutes: Routes = [
    {
        key: 'calender',
        path: '/calender',
        component: lazy(() => import('@/views/doctor/Calendar/Calendar')),
        authority: [],
    },

    {
        key: 'room',
        path: '/room',
        component: lazy(() => import('@/views/doctor/Room')),
        authority: [],
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

export const protectedRoutes: Routes = [...adminRoutes, ...doctorRoutes]
