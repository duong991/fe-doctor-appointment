import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetDoctorDashboardData } from '@/services/ProjectService'
import { EStatus } from '@/constants/data.constant'

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
        patientName: string
        status: EStatus
        scheduleTime: string
    }[]
    scheduleData?: {
        id: string
        scheduleTime: string
        status: EStatus
        patientName: string
    }[]
}

type GetDoctorDashboardDataResponse = DashboardData

export type ProjectDashboardState = {
    loading: boolean
    dashboardData: DashboardData
    scheduleSelected: string
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
    scheduleSelected: '',
}

export const confirmVideoScheduleCompletion = async (data: { id: string }) => {
    console.log('Call API')
    return true
}

const projectDashboardSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setScheduleSelected: (state, action) => {
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
    },
})

export const { setScheduleSelected } = projectDashboardSlice.actions

export default projectDashboardSlice.reducer
