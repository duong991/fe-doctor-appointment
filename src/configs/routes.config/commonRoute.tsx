import { lazy } from 'react'
import type { Routes } from '@/@types/routes'
import { Role } from '@/@types/enum'

const commonRoutes: Routes = [
    {
        key: 'access-denied',
        path: '/access-denied',
        component: lazy(() => import('@/views/common/AccessDenied')),
        authority: [Role.ADMIN, Role.DOCTOR],
    },
]

export default commonRoutes
