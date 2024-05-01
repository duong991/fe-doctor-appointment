import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetProjectDashboardData } from '@/services/ProjectService'

type ProjectOverviewChart = {
    onGoing: number
    finished: number
    total: number
    series: {
        name: string
        data: number[]
    }[]
    range: string[]
}

type DashboardData = {
    userName?: string
    taskCount?: number
    projectOverviewData?: {
        chart: {
            daily: ProjectOverviewChart
            weekly: ProjectOverviewChart
            monthly: ProjectOverviewChart
        }
    }
    myTasksData?: {
        taskId: string
        taskSubject: string
        priority: number
        assignees: {
            id: string
            name: string
            email: string
            img: string
        }[]
    }[]
    scheduleData?: {
        id: string
        time: string
        eventName: string
        desciption: string
        type: string
    }[]
    projectsData?: {
        id: number
        name: string
        category: string
        desc: string
        attachmentCount: number
        totalTask: number
        completedTask: number
        progression: number
        dayleft: number
        status: string
        member: {
            name: string
            img: string
        }[]
    }[]
}

type GetProjectDashboardDataResponse = DashboardData

export type ProjectDashboardState = {
    loading: boolean
    dashboardData: DashboardData
    scheduleSelected: string
}

export const SLICE_NAME = 'projectDashboard'

export const getProjectDashboardData = createAsyncThunk(
    SLICE_NAME + '/getProjectDashboardData',
    async () => {
        const response =
            await apiGetProjectDashboardData<GetProjectDashboardDataResponse>()
        return response.data
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
            .addCase(getProjectDashboardData.fulfilled, (state, action) => {
                state.dashboardData = action.payload
                state.loading = false
            })
            .addCase(getProjectDashboardData.pending, (state) => {
                state.loading = true
            })
    },
})

export const { setScheduleSelected } = projectDashboardSlice.actions

export default projectDashboardSlice.reducer