import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'
import { Role } from '@/@types/enum'

// export type UserState = {
//     avatar?: string
//     userName?: string
//     email?: string
//     authority?: string[]
// }

export type UserState = {
    email: string
    userId?: string
    role?: Role
}

const initialState: UserState = {
    email: '',
    userId: '',
}

const userSlice = createSlice({
    name: `${SLICE_BASE_NAME}/user`,
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.email = action.payload?.email
            state.userId = action.payload?.userId
            state.role = action.payload?.role
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
