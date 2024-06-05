import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetCrmCustomerDetails,
    apiDeleteCrmCustomer,
    apPutCrmCustomer,
    apiGetCustomerDetails,
} from '@/services/PatientService'
import { EPaymentStatus, EStatus } from '@/constants/data.constant'
import { apiChangeStatusSmartCard } from '@/services/AdminService'

export const SLICE_NAME = 'crmCustomerDetails'

export type FavoriteDoctor = {
    id: string
    name: string
    specialist: string
    rating: number
}
export type AppointmentHistory = {
    id: string
    status: EStatus
    amount: number
    date: number
}
export type Customer = {
    id: string
    name: string
    email: string
    img: string
    role: string
    address: string
    smartCardStatus: string
    dob: string
    phone: string
}

type GetPatientDetailsResponse = Customer & {
    favoriteDoctor?: FavoriteDoctor[]
    appointmentHistory?: AppointmentHistory[]
}

type GetCrmCustomerDetailsRequest = { id: string }

// eslint-disable-next-line @typescript-eslint/ban-types
type DeleteCrmCustomerResponse = {}

type DeleteCrmCustomerRequest = { id: string }

export type CustomerDetailState = {
    loading: boolean
    profileData: Partial<Customer>
    favoriteDoctorData: FavoriteDoctor[]
    appointmentHistoryData: AppointmentHistory[]
    deletePaymentMethodDialog: boolean
    editPaymentMethodDialog: boolean
    editCustomerDetailDialog: boolean
    openSmartCardDialog: boolean
}

export const getCustomer = createAsyncThunk(
    SLICE_NAME + '/getCustomer',
    async (data: GetCrmCustomerDetailsRequest) => {
        const response = await apiGetCustomerDetails<
            GetPatientDetailsResponse,
            GetCrmCustomerDetailsRequest
        >(data)
        return response.data.data
    }
)

export const deleteCustomer = createAsyncThunk(
    SLICE_NAME + '/deleteCustomer',
    async (data: DeleteCrmCustomerRequest) => {
        const response = await apiDeleteCrmCustomer<
            DeleteCrmCustomerResponse,
            DeleteCrmCustomerRequest
        >(data)
        return response.data
    }
)

export const putCustomer = createAsyncThunk(
    SLICE_NAME + '/putCustomer',
    async (data: Customer) => {
        const response = await apPutCrmCustomer(data)
        return response.data
    }
)

export type TChangeStatusSmartCardRequest = {
    userId: string
    status: boolean
}

const initialState: CustomerDetailState = {
    loading: true,
    profileData: {},
    favoriteDoctorData: [],
    appointmentHistoryData: [],
    deletePaymentMethodDialog: false,
    editPaymentMethodDialog: false,
    editCustomerDetailDialog: false,
    openSmartCardDialog: false,
}

const customerDetailSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateProfileData: (state, action) => {
            state.profileData = action.payload
        },
        openDeletePaymentMethodDialog: (state) => {
            state.deletePaymentMethodDialog = true
        },
        closeDeletePaymentMethodDialog: (state) => {
            state.deletePaymentMethodDialog = false
        },
        openEditPaymentMethodDialog: (state) => {
            state.editPaymentMethodDialog = true
        },
        closeEditPaymentMethodDialog: (state) => {
            state.editPaymentMethodDialog = false
        },
        openEditCustomerDetailDialog: (state) => {
            state.editCustomerDetailDialog = true
        },
        closeEditCustomerDetailDialog: (state) => {
            state.editCustomerDetailDialog = false
        },
        openSmartCardDialog: (state) => {
            state.openSmartCardDialog = true
        },
        closeSmartCardDialog: (state) => {
            state.openSmartCardDialog = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCustomer.fulfilled, (state, action) => {
                state.loading = false
                state.profileData = action.payload
                state.appointmentHistoryData =
                    action.payload?.appointmentHistory || []
                state.favoriteDoctorData = action.payload?.favoriteDoctor || []
            })
            .addCase(getCustomer.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    updateProfileData,
    openDeletePaymentMethodDialog,
    closeDeletePaymentMethodDialog,
    openEditPaymentMethodDialog,
    closeEditPaymentMethodDialog,
    openEditCustomerDetailDialog,
    closeEditCustomerDetailDialog,
    openSmartCardDialog,
    closeSmartCardDialog,
} = customerDetailSlice.actions

export default customerDetailSlice.reducer
