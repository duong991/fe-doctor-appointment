import {
    createSlice,
    createAsyncThunk,
    current,
    PayloadAction,
} from '@reduxjs/toolkit'
import {
    apiGetAppointments,
    apiDeleteSalesOrders,
} from '@/services/DoctorService'
import type { TableQueries } from '@/@types/common'
import { EPaymentType, EStatus } from '@/constants/data.constant'

type Order = {
    id: string
    date: number
    customer: string
    status: EStatus
    paymentMethod: EPaymentType
    totalAmount: number
}

type Orders = Order[]

type GetSalesOrdersResponse = {
    data: Orders
    total: number
}

export type SalesOrderListState = {
    loading: boolean
    orderList: Orders
    tableData: TableQueries
    deleteMode: 'single' | 'batch' | ''
    selectedRows: string[]
    selectedRow: string
}

export const SLICE_NAME = 'salesOrderList'

export const getOrders = createAsyncThunk(
    SLICE_NAME + '/getAppointments',
    async (data: TableQueries) => {
        const response = await apiGetAppointments<
            GetSalesOrdersResponse,
            TableQueries
        >(data)
        return response.data.data
    }
)

export const deleteOrders = async (data: { id: string | string[] }) => {
    const response = await apiDeleteSalesOrders<
        boolean,
        { id: string | string[] }
    >(data)
    return response.data.data
}

const initialState: SalesOrderListState = {
    loading: false,
    orderList: [],
    tableData: {
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        query: '',
        sort: {
            order: '',
            key: '',
        },
    },
    selectedRows: [],
    selectedRow: '',
    deleteMode: '',
}

const paymentListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setOrderList: (state, action) => {
            state.orderList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setSelectedRows: (state, action) => {
            state.selectedRows = action.payload
        },
        setSelectedRow: (state, action) => {
            state.selectedRow = action.payload
        },
        addRowItem: (state, { payload }) => {
            const currentState = current(state)
            if (!currentState.selectedRows.includes(payload)) {
                state.selectedRows = [...currentState.selectedRows, ...payload]
            }
        },
        removeRowItem: (state, { payload }: PayloadAction<string>) => {
            const currentState = current(state)
            if (currentState.selectedRows.includes(payload)) {
                state.selectedRows = currentState.selectedRows.filter(
                    (id) => id !== payload
                )
            }
        },
        setDeleteMode: (state, action) => {
            state.deleteMode = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.fulfilled, (state, action) => {
                state.orderList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getOrders.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    setOrderList,
    setTableData,
    setSelectedRows,
    setSelectedRow,
    addRowItem,
    removeRowItem,
    setDeleteMode,
} = paymentListSlice.actions

export default paymentListSlice.reducer
