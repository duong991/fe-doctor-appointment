import ApiService from './ApiService'

export async function apiGetSalesDashboardData<
    T extends Record<string, unknown>
>() {
    return ApiService.fetchData<T>({
        url: '/sales/dashboard',
        method: 'post',
    })
}

export async function apiGetAllDoctor<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/admin/get-all-doctor',
        method: 'post',
        data,
    })
}

export async function apiDeleteSalesProducts<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/sales/products/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetDoctorDetail<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/admin/doctor-detail',
        method: 'get',
        params,
    })
}

export async function apiPutSalesProduct<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/sales/products/update',
        method: 'put',
        data,
    })
}

export async function apiCreateDoctor<T, U extends Record<string, unknown>>(
    data: U
) {
    const formData = new FormData()
    /*
     *
     */
    Object.keys(data).forEach((key) => {
        if (key === 'imgList') {
            const imgList = (data[key] as any[])?.map(
                (item: any) => item.files
            ) as Array<File>
            imgList.forEach((file, index) => {
                formData.append(`image`, file)
            })
        } else {
            formData.append(key, data[key] as string)
        }
    })

    return ApiService.fetchData<T>({
        url: '/doctors/create',
        headers: { 'Content-Type': 'multipart/form-data' },
        method: 'post',
        data: formData,
    })
}

export async function apiDeleteSalesOrders<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/sales/orders/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetAppointments<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/admin/get-all-appointments',
        method: 'get',
        params,
    })
}
export async function apiGetAppointmentDetails<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/admin/get-appointment-details',
        method: 'get',
        params,
    })
}
