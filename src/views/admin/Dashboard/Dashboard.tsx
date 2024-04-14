import { useEffect, useState } from 'react'
import reducer, {
    getCrmDashboardData,
    useAppDispatch,
    useAppSelector,
} from './store'
import { injectReducer } from '@/store/'

import Loading from '@/components/shared/Loading'
import Statistic from './components/Statistic'
import Leads from './components/Leads'
import RevStats from './components/PortfolioStats'
import Jitsi from 'react-jitsi'
import { JitsiMeeting } from '@jitsi/react-sdk'

injectReducer('Dashboard', reducer)

const Dashboard = () => {
    // const dispatch = useAppDispatch()

    // const { statisticData, recentLeadsData, revStatsData } = useAppSelector(
    //     (state) => state.Dashboard.data.dashboardData
    // )
    // const loading = useAppSelector((state) => state.Dashboard.data.loading)

    // useEffect(() => {
    //     fetchData()
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    // const fetchData = () => {
    //     dispatch(getCrmDashboardData())
    // }

    return (
        <div className="flex flex-col gap-4 h-full ">
            <JitsiMeeting
                domain="call.daugiasodep.vn"
                roomName="9128371209"
                configOverwrite={{
                    startWithAudioMuted: false,
                    disableModeratorIndicator: true,
                    startScreenSharing: false,
                    enableEmailInStats: false,
                    disableRemoteMute: true,
                    disableRemoteControl: true,
                }}
                interfaceConfigOverwrite={{
                    DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                }}
                userInfo={{
                    email: 'dongminhduong991@gmail.com',
                    displayName: 'Bác sĩ Đồng Minh Dương',
                }}
                getIFrameRef={(iframeRef) => {
                    iframeRef.style.height = '100%'
                    iframeRef.style.width = '99%'
                    iframeRef.style.border = '25px'
                }}
                onApiReady={(externalApi) => {}}
            />
        </div>
    )
}

export default Dashboard
