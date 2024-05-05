import { useEffect } from 'react'
import reducer, {
    getProjectDashboardData,
    useAppDispatch,
    useAppSelector,
} from './store'
import { injectReducer } from '@/store'
import Loading from '@/components/shared/Loading'
import ProjectDashboardHeader from './components/ProjectDashboardHeader'
import TaskOverview from './components/TaskOverview'
import MyTasks from './components/MyTasks'
import Schedule from './components/Schedule'
import DialogConfirmation from './components/DialogConfirmation'

injectReducer('projectDashboard', reducer)

const ProjectDashboard = () => {
    const dispatch = useAppDispatch()

    const dashboardData = useAppSelector(
        (state) => state.projectDashboard.data.dashboardData
    )
    const loading = useAppSelector(
        (state) => state.projectDashboard.data.loading
    )

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = () => {
        dispatch(getProjectDashboardData())
    }

    return (
        <div className="flex flex-col gap-4 h-full">
            <Loading loading={loading}>
                <ProjectDashboardHeader
                    userName={dashboardData?.userName}
                    taskCount={dashboardData?.taskCount}
                />
                <div className="flex flex-col xl:flex-row gap-4">
                    <div className="flex flex-col gap-4 flex-auto">
                        <TaskOverview
                            data={dashboardData?.projectOverviewData}
                        />
                        <MyTasks data={dashboardData?.myTasksData} />
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="xl:w-[380px]">
                            <Schedule data={dashboardData?.scheduleData} />
                            <DialogConfirmation />
                        </div>
                    </div>
                </div>
            </Loading>
        </div>
    )
}

export default ProjectDashboard
