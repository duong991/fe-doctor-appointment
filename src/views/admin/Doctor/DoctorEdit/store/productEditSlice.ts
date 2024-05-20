import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiDeleteSalesProducts,
    apiGetDoctorDetail,
    apiUpDateDoctor,
} from '@/services/DoctorService'
import { FormModel } from '../../DoctorForm'

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

type TUpdateDoctorResponse = DoctorData
type TUpdateDoctorRequest = DoctorData
export const updateDoctor = createAsyncThunk(
    SLICE_NAME + '/updateDoctor',
    async (data: FormModel) => {
        const response = await apiUpDateDoctor<
            TUpdateDoctorResponse,
            TUpdateDoctorRequest
        >(data)
        return response.data.data
    }
)

// export const updateDoctor = async <T, U extends Record<string, unknown>>(
//     data: U
// ) => {
//     const response = await apiUpDateDoctor<T, U>(data)
//     return response.data
// }

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
            .addCase(getDoctorDetail.rejected, (state) => {
                state.loading = false
            })
            .addCase(updateDoctor.fulfilled, (state, action) => {
                state.doctorData = action.payload
            })
            .addCase(updateDoctor.pending, (state) => {
                state.loading = true
            })
            .addCase(updateDoctor.rejected, (state) => {
                state.loading = false
            })
    },
})

export default productEditSlice.reducer
