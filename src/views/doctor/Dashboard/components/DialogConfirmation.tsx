import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    confirmVideoScheduleCompletion,
    getDoctorDashboardData,
    setScheduleSelected,
    useAppDispatch,
    useAppSelector,
} from '../store'

const DialogConfirmation = () => {
    const dispatch = useAppDispatch()

    const scheduleSelected = useAppSelector(
        (state) => state.projectDashboard.data.scheduleSelected
    )

    const onDialogClose = () => {
        dispatch(setScheduleSelected(''))
    }

    const onDelete = async () => {
        const success = await confirmVideoScheduleCompletion({
            id: scheduleSelected,
        })
        deleteSucceed(success || true)
        dispatch(setScheduleSelected(''))
    }

    const fetchData = () => {
        dispatch(getDoctorDashboardData())
    }

    const deleteSucceed = (success: boolean) => {
        if (success) {
            fetchData()
            toast.push(
                <Notification
                    title={'Successfuly'}
                    type="success"
                    duration={2500}
                >
                    Xác nhận hoàn thành lịch hẹn
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    return (
        <ConfirmDialog
            isOpen={scheduleSelected !== ''}
            type="success"
            title="Xác nhận hoàn thành lịch hẹn"
            confirmButtonColor="green-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>Hãy chắc chắn bạn đã hoàn thành khám bệnh với bệnh nhân</p>
        </ConfirmDialog>
    )
}

export default DialogConfirmation
