import { Role } from './enum'

export type SignInCredential = {
    email: string
    password: string
}

export type SignInResponse = {
    accessToken: string
    refreshToken: string
    userData: {
        email: string
        userId?: string
        role?: Role
    }
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    userName: string
    email: string
    password: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}
