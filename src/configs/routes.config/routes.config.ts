import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes: Routes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/admin/Dashboard/Dashboard')),
        authority: [],
    },
    {
        key: '/doctor',
        path: '/doctor',
        component: lazy(() => import('@/views/admin/Doctor/ProductList')),
        authority: [],
    },
    {
        key: '/doctor',
        path: '/doctor',
        component: lazy(() => import('@/views/admin/Doctor/ProductList')),
        authority: [],
    },
    {
        key: 'doctor.doctorNew',
        path: `/doctor/doctor-new`,
        component: lazy(() => import('@/views/admin/Doctor/ProductNew')),
        authority: [],
        meta: {
            header: 'Add New Doctor',
        },
    },
    {
        key: 'doctor.editDoctor',
        path: `/doctor/doctor-edit/:doctorId`,
        component: lazy(() => import('@/views/admin/Doctor/ProductEdit')),
        authority: [],
        meta: {
            header: 'Edit Doctor',
        },
    },
    {
        key: '/doctor-info',
        path: '/doctor',
        component: lazy(() => import('@/views/admin/Calendar/Calendar')),
        authority: [],
    },
    {
        key: 'patient',
        path: '/patient',
        component: lazy(() => import('@/views/admin/Customers')),
        authority: [],
    },
    {
        key: 'calender',
        path: '/calender',
        component: lazy(() => import('@/views/admin/Calendar/Calendar')),
        authority: [],
    },
]
