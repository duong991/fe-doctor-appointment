import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetCrmCalendar } from '@/services/PatientService'
import { apiCreateAppointment, apiUploadExcel } from '@/services/AdminService'

type Event = {
    id: string
    title: string
    start: string
    end?: string
    eventColor: string
    groupId?: undefined
}

type Events = Event[]

export type CalendarState = {
    loading: boolean
    message?: string
    eventList: Events
    isUpload: boolean
    isNavigateToDoctor: boolean
    selected: {
        type: string
    } & Partial<Event>
}

export const SLICE_NAME = 'adminCalender'

type TUploadExcelResponse = Events
export type TUploadExcelRequest = {
    file: File
    listDoctorId: string[]
}

export const uploadExcel = createAsyncThunk(
    SLICE_NAME + '/uploadExcel',
    async (data: TUploadExcelRequest) => {
        const response = await apiUploadExcel<
            TUploadExcelResponse,
            TUploadExcelRequest
        >(data)

        return response.data.data
    }
)

export type TCreateAppointmentResponse = boolean
export type TCreateAppointmentRequest = {
    schedule: Events
    listDoctorId: string[]
}
export const createAppointment = createAsyncThunk(
    SLICE_NAME + '/createAppointment',
    async (data: TCreateAppointmentRequest) => {
        const response = await apiCreateAppointment<
            TCreateAppointmentResponse,
            TCreateAppointmentRequest
        >(data)
        return response.data
    }
)

const initialState: CalendarState = {
    loading: false,
    message: '',
    eventList: [],
    isUpload: false,
    selected: {
        type: '',
    },
    isNavigateToDoctor: false,
}

const calendarSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateEvent: (state, action) => {
            state.eventList = action.payload
        },
        setIsUploadTrue: (state) => {
            state.isUpload = true
        },
        setIsUpdateFalse: (state) => {
            state.isUpload = false
        },
        setSelected: (state, action) => {
            state.selected = action.payload
        },
        clearAllState: () => initialState,
    },
    extraReducers: (builder) => {
        /*
         * API upload excel
         */
        builder.addCase(uploadExcel.fulfilled, (state, action) => {
            state.eventList = action.payload
            state.isUpload = true
            state.loading = false
        })
        builder.addCase(uploadExcel.pending, (state) => {
            state.loading = true
        })
        builder.addCase(uploadExcel.rejected, (state) => {
            state.isUpload = true
            state.loading = false
        })

        /*
         * API create appointment
         */
        builder.addCase(createAppointment.fulfilled, (state) => {
            state.isNavigateToDoctor = true
            state.loading = false
        })
        builder.addCase(createAppointment.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createAppointment.rejected, (state, action) => {
            state.loading = false
        })
    },
})

export const { updateEvent, setSelected, clearAllState } = calendarSlice.actions

export default calendarSlice.reducer
