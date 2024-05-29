import {
    createSlice,
    createAsyncThunk,
    current,
    PayloadAction,
} from '@reduxjs/toolkit'
import {
    apiGetAllDoctor,
    apiDeleteSalesProducts,
} from '@/services/DoctorService'
import type { TableQueries } from '@/@types/common'

type Doctor = {
    id: string
    name: string
    img: string
    email: string
    revenue: number
    specialist: string
    averageRating: number
    onlinePrice: number
    offlinePrice: number
}

export type Doctors = Doctor[]

type GetSalesProductsResponse = {
    data: Doctors
    total: number
}

type FilterQueries = {
    name: string
    specialist: string[]
}

export type SalesProductListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedProduct: string
    tableData: TableQueries
    filterData: FilterQueries
    doctorList: Doctor[]
    selectedRows: string[]
}

type GetSalesProductsRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'doctorList'

export const getProducts = createAsyncThunk(
    SLICE_NAME + '/getDoctors',
    async (data: GetSalesProductsRequest) => {
        console.log('🚀 ~ data:', data)
        const response = await apiGetAllDoctor<
            GetSalesProductsResponse,
            GetSalesProductsRequest
        >(data)

        return response.data.data
    }
)

export const deleteProduct = async (data: { id: string | string[] }) => {
    const response = await apiDeleteSalesProducts<
        boolean,
        { id: string | string[] }
    >(data)
    return response.data
}

export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

const initialState: SalesProductListState = {
    loading: false,
    deleteConfirmation: false,
    selectedProduct: '',
    doctorList: [],
    tableData: initialTableData,
    filterData: {
        name: '',
        specialist: [],
    },
    selectedRows: [],
}

const doctorListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateProductList: (state, action) => {
            state.doctorList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            console.log('🚀 ~ action:', action.payload)
            state.filterData = action.payload
        },
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload
        },
        setSelectedRows: (state, action) => {
            state.selectedRows = action.payload
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.fulfilled, (state, action) => {
                state.doctorList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getProducts.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    updateProductList,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedProduct,
    setSelectedRows,
    addRowItem,
    removeRowItem,
} = doctorListSlice.actions

export default doctorListSlice.reducer
