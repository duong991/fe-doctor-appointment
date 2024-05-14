import { apiSignIn, apiSignOut } from '@/services/AuthService'
import {
    setUser,
    signInSuccess,
    signOutSuccess,
    useAppSelector,
    useAppDispatch,
} from '@/store'
import appConfig from '@/configs/app.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import type { SignInCredential, SignUpCredential } from '@/@types/auth'

type Status = 'success' | 'failed'

function useAuth() {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const query = useQuery()

    const { accessToken, refreshToken, signedIn } = useAppSelector(
        (state) => state.auth.session
    )

    const { role, userId, email } = useAppSelector((state) => state.auth.user)

    const signIn = async (
        values: SignInCredential
    ): Promise<
        | {
              status: Status
              message: string
          }
        | undefined
    > => {
        try {
            const resp = await apiSignIn(values)
            if (resp.data && resp.data.status === 'success') {
                const { accessToken, refreshToken, userData } = resp.data.data
                dispatch(
                    signInSuccess({
                        signedIn: true,
                        accessToken,
                        refreshToken,
                    })
                )
                if (userData) {
                    dispatch(setUser(userData))
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )
                return {
                    status: 'success',
                    message: '',
                }
            } else {
                throw new Error(resp.data.message)
            }
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const signUp = async (values: SignUpCredential) => {
        // try {
        //     const resp = await apiSignUp(values)
        //     if (resp.data) {
        //         const { token } = resp.data
        //         dispatch(signInSuccess(token))
        //         if (resp.data.user) {
        //             dispatch(
        //                 setUser(
        //                     resp.data.user || {
        //                         avatar: '',
        //                         userName: 'Anonymous',
        //                         authority: ['USER'],
        //                         email: '',
        //                     }
        //                 )
        //             )
        //         }
        //         const redirectUrl = query.get(REDIRECT_URL_KEY)
        //         navigate(
        //             redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
        //         )
        //         return {
        //             status: 'success',
        //             message: '',
        //         }
        //     }
        //     // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        // } catch (errors: any) {
        //     return {
        //         status: 'failed',
        //         message: errors?.response?.data?.message || errors.toString(),
        //     }
        // }
    }

    const handleSignOut = () => {
        console.log('🚀 ~ handleSignOut ~ handleSignOut:', handleSignOut)

        dispatch(signOutSuccess())
        dispatch(
            setUser({
                email: '',
                userId: '',
                role: undefined,
            })
        )
        navigate(appConfig.unAuthenticatedEntryPath)
    }

    const signOut = async () => {
        // await apiSignOut()
        handleSignOut()
    }

    return {
        user: {
            role,
            email,
            userId,
        },
        authenticated: accessToken && refreshToken && signedIn,
        signIn,
        signUp,
        signOut,
    }
}

export default useAuth
