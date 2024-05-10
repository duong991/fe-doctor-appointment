import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetCrmCustomerDetails,
    apiDeleteCrmCustomer,
    apPutCrmCustomer,
} from '@/services/PatientService'
import { EPaymentStatus } from '@/constants/data.constant'

export const SLICE_NAME = 'crmCustomerDetails'

export type FavoriteDoctor = {
    id: string
    name: string
    specialist: string
    rating: number
}
export type PaymentHistory = {
    id: string
    status: EPaymentStatus
    amount: number
    date: number
}

export type PaymentMethod = {
    id: number
    cardName: string
    balance: number
    isBlocked: boolean
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
    paymentMethod?: PaymentMethod
    paymentHistory?: PaymentHistory[]
}

type GetCrmCustomerDetailsRequest = { id: string }

// eslint-disable-next-line @typescript-eslint/ban-types
type DeleteCrmCustomerResponse = {}

type DeleteCrmCustomerRequest = { id: string }

export type CustomerDetailState = {
    loading: boolean
    profileData: Partial<Customer>
    favoriteDoctorData: FavoriteDoctor[]
    paymentHistoryData: PaymentHistory[]
    paymentMethodData: PaymentMethod
    deletePaymentMethodDialog: boolean
    editPaymentMethodDialog: boolean
    editCustomerDetailDialog: boolean
    selectedCard: Partial<PaymentMethod>
}

export const getCustomer = createAsyncThunk(
    SLICE_NAME + '/getCustomer',
    async (data: GetCrmCustomerDetailsRequest) => {
        const response = await apiGetCrmCustomerDetails<
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

const initialState: CustomerDetailState = {
    loading: true,
    profileData: {},
    favoriteDoctorData: [],
    paymentHistoryData: [],
    paymentMethodData: {
        id: 0,
        cardName: '',
        balance: 0,
        isBlocked: false,
    },
    deletePaymentMethodDialog: false,
    editPaymentMethodDialog: false,
    editCustomerDetailDialog: false,
    selectedCard: {},
}

const customerDetailSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updatePaymentMethodData: (state, action) => {
            state.paymentMethodData = action.payload
        },
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
        updateSelectedCard: (state, action) => {
            state.selectedCard = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCustomer.fulfilled, (state, action) => {
                state.loading = false
                state.profileData = action.payload
                state.paymentHistoryData = action.payload?.paymentHistory || []
                state.favoriteDoctorData = action.payload?.favoriteDoctor || []
                state.paymentMethodData = action.payload?.paymentMethod || {
                    id: 0,
                    cardName: '',
                    balance: 0,
                    isBlocked: false,
                }
            })
            .addCase(getCustomer.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    updatePaymentMethodData,
    updateProfileData,
    openDeletePaymentMethodDialog,
    closeDeletePaymentMethodDialog,
    openEditPaymentMethodDialog,
    closeEditPaymentMethodDialog,
    openEditCustomerDetailDialog,
    closeEditCustomerDetailDialog,
    updateSelectedCard,
} = customerDetailSlice.actions

export default customerDetailSlice.reducer
