export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    tourPath: string
    locale: string
    enableMock: boolean
}

// const appConfig: AppConfig = {
//     apiPrefix: '/',
//     authenticatedEntryPath: '/home',
//     unAuthenticatedEntryPath: '/sign-in',
//     tourPath: '/',
//     locale: 'en',
//     enableMock: true,
// }

const appConfig: AppConfig = {
    apiPrefix: 'http://localhost:3000',
    authenticatedEntryPath: '/home',
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/',
    locale: 'vi',
    enableMock: false,
}

export default appConfig
