import { useEffect } from 'react'
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

injectReducer('Dashboard', reducer)

const Dashboard = () => {
    const dispatch = useAppDispatch()

    const { statisticData, recentLeadsData, revStatsData } = useAppSelector(
        (state) => state.Dashboard.data.dashboardData
    )
    const loading = useAppSelector((state) => state.Dashboard.data.loading)

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = () => {
        dispatch(getCrmDashboardData())
    }

    return (
        <div className="flex flex-col gap-4 h-full">
            <Loading loading={loading}>
                <Statistic data={statisticData} />
                <div className="grid grid-cols-1 xl:grid-cols-11 gap-4">
                    <RevStats
                        className="2xl:col-span-11 xl:col-span-11"
                        data={revStatsData}
                    />
                </div>
                <Leads data={recentLeadsData} />
            </Loading>
        </div>
    )
}

export default Dashboard
