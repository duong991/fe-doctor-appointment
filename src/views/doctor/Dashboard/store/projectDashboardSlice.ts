import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetDoctorDashboardData } from '@/services/ProjectService'
import { EStatus } from '@/constants/data.constant'
import { apiConfirmAppointment } from '@/services/SalesService'

type ScheduleOverviewChart = {
    onGoing: number
    finished: number
    total: number
    series: {
        name: string
        data: number[]
    }[]
    timeRange: string[]
}

type DashboardData = {
    userName?: string
    taskCount?: number
    scheduleOverviewData?: {
        chart: {
            daily: ScheduleOverviewChart
            weekly: ScheduleOverviewChart
            monthly: ScheduleOverviewChart
        }
    }
    myTasksData?: {
        id: string
        scheduleDate: string
        patientName: string
        scheduleTime: string
        status: EStatus
        paymentMethod: string
        totalAmount: number
    }[]
    scheduleData?: {
        id: string
        scheduleDate: string
        patientName: string
        scheduleTime: string
        status: EStatus
        paymentMethod: string
        totalAmount: number
    }[]
}

type GetDoctorDashboardDataResponse = DashboardData

export type TScheduleSelected = {
    id: string
    type: string
}
export type ProjectDashboardState = {
    loading: boolean
    dashboardData: DashboardData
    scheduleSelected: TScheduleSelected
}

export const SLICE_NAME = 'projectDashboard'

export const getDoctorDashboardData = createAsyncThunk(
    SLICE_NAME + '/getDoctorDashboardData',
    async () => {
        const response =
            await apiGetDoctorDashboardData<GetDoctorDashboardDataResponse>()
        return response.data.data
    }
)

const initialState: ProjectDashboardState = {
    loading: true,
    dashboardData: {},
    scheduleSelected: {
        id: '',
        type: '',
    },
}

export const confirmVideoScheduleCompletion = async (data: {
    id: string
    type: string
}) => {
    const response = await apiConfirmAppointment<
        boolean,
        {
            id: string
            type: string
        }
    >(data)
    return response.data.data
}
export const confirmAppointment = async (data: { id: string | string[] }) => {
    const response = await apiConfirmAppointment<
        boolean,
        { id: string | string[] }
    >(data)
    return response.data.data
}

const projectDashboardSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setScheduleSelected: (state, action) => {
            console.log('🚀 ~ action:', action)
            state.scheduleSelected = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDoctorDashboardData.fulfilled, (state, action) => {
                state.dashboardData = action.payload
                state.loading = false
            })
            .addCase(getDoctorDashboardData.pending, (state) => {
                state.loading = true
            })

        // API con
    },
})

export const { setScheduleSelected } = projectDashboardSlice.actions

export default projectDashboardSlice.reducer
