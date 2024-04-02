import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/home/Dashboard/Dashboard')),
        authority: [],
    },
    {
        key: 'patient',
        path: '/patient',
        component: lazy(() => import('@/views/home/Customers')),
        authority: [],
    },
    {
        key: 'calender',
        path: '/calender',
        component: lazy(() => import('@/views/home/Calendar/Calendar')),
        authority: [],
    },
    {
        key: 'payment',
        path: '/payment',
        component: lazy(() => import('@/views/home/Calendar/Calendar')),
        authority: [],
    },
]
