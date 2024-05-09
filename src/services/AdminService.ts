import ApiService from './ApiService'

export async function apiUploadExcel<T, U extends Record<string, unknown>>(
    data: U
) {
    const formData = new FormData()

    Object.keys(data).forEach((key) => {
        if (key === 'file') {
            formData.append(`file`, data[key] as File)
        } else {
            const value = data[key]
            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    formData.append(`${key}[${index}]`, item)
                })
            } else {
                formData.append(key, value as string)
            }
        }
    })
    return ApiService.fetchData<T>({
        url: '/admin/appointment/upload-excel',
        headers: { 'Content-Type': 'multipart/form-data' },
        method: 'post',
        data: formData, // truyền formData vào request
    })
}

export async function apiCreateAppointment<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/admin/appointment/create',
        method: 'post',
        data,
    })
}
