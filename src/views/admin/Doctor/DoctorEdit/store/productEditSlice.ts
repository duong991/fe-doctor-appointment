import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiPutSalesProduct,
    apiDeleteSalesProducts,
    apiGetDoctorDetail,
} from '@/services/DoctorService'

type DoctorData = {
    id?: string
    name?: string
    dob?: string
    phone?: string
    email?: string
    gender?: boolean
    img?: string
    imgList?: {
        id: string
        name: string
        img: string
    }[]
    address?: string
    yearsOfExperience?: string
    specialist?: string
    services?: string[]
    onlinePrice?: number
    offlinePrice?: number
    description?: string
}

export type SalesProductEditState = {
    loading: boolean
    doctorData: DoctorData
}

type GetSalesProductResponse = DoctorData

export const SLICE_NAME = 'doctorEdit'

export const getDoctorDetail = createAsyncThunk(
    SLICE_NAME + '/getDoctor',
    async (data: { id: string }) => {
        const response = await apiGetDoctorDetail<
            GetSalesProductResponse,
            { id: string }
        >(data)
        return response.data.data
    }
)

export const updateProduct = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiPutSalesProduct<T, U>(data)
    return response.data
}

export const deleteProduct = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiDeleteSalesProducts<T, U>(data)
    return response.data
}

const initialState: SalesProductEditState = {
    loading: true,
    doctorData: {},
}

const productEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDoctorDetail.fulfilled, (state, action) => {
                state.doctorData = action.payload
                state.loading = false
            })
            .addCase(getDoctorDetail.pending, (state) => {
                state.loading = true
            })
    },
})

export default productEditSlice.reducer
