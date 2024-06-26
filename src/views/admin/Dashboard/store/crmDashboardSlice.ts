import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetCrmDashboardData } from '@/services/PatientService'
import { IResponse } from '@/services/ApiService'

export type Statistic = {
    key: string
    label: string
    value: number
    growShrink: number
}

type Stat = {
    series: {
        name: string
        data: number[]
    }[]
    timeRange: string[]
}

export type RevStats = Record<string, Stat>

export type Lead = {
    id: string
    name: string
    avatar: string
    // status: number
    createdTime: string //chuyen khoa
    email: string
    assignee: number //rating
}

export type DashboardData = {
    statisticData: Statistic[]
    recentLeadsData: Lead[]
    revStatsData: RevStats
}

type CrmDashboardDataResponse = DashboardData

export type CrmDashboardState = {
    loading: boolean
    dashboardData: Partial<DashboardData>
}

export const SLICE_NAME = 'Dashboard'

export const getCrmDashboardData = createAsyncThunk(
    'Dashboard/data/getCrmDashboardData',
    async () => {
        const response =
            await apiGetCrmDashboardData<CrmDashboardDataResponse>()
        return response.data.data
    }
)

const initialState: CrmDashboardState = {
    loading: true,
    dashboardData: {},
}

const crmDashboardSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCrmDashboardData.fulfilled, (state, action) => {
                state.dashboardData = action.payload
                state.loading = false
            })
            .addCase(getCrmDashboardData.pending, (state) => {
                state.loading = true
            })
    },
})

export default crmDashboardSlice.reducer
