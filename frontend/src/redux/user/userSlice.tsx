import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface User {
    createdAt?: string;
    email: string;
    fullName: string;
    token?: string;
    updatedAt?: string;
    __v?: number;
    _id?: string;
    profilePicture: string
}
interface UserState {
    currentUser: User | null;
}

const initialState: UserState = {
    currentUser: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInSuccess: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload
        },
        logout: (state) => {
            state.currentUser = null;
        }
    },
})
export const { signInSuccess, logout } = userSlice.actions

export default userSlice.reducer