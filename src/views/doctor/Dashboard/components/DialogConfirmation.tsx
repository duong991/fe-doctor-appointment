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
        dispatch(
            setScheduleSelected({
                id: '',
                type: '',
            })
        )
    }

    const onConfirm = async (text: string) => {
        const success = await confirmVideoScheduleCompletion({
            id: scheduleSelected.id,
            type: scheduleSelected.type,
            conclusion: text,
        })
        deleteSucceed(success)
        dispatch(setScheduleSelected({ id: '', type: '' }))
    }

    const fetchData = () => {
        dispatch(getDoctorDashboardData())
    }

    const deleteSucceed = (success: boolean) => {
        if (success) {
            fetchData()
            toast.push(
                <Notification
                    title={'Thành công'}
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
            isOpen={scheduleSelected.id !== '' && scheduleSelected.type !== ''}
            type="success"
            title="Xác nhận hoàn thành lịch hẹn"
            confirmButtonColor="green-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onConfirm}
        >
            <p>Hãy chắc chắn bạn đã hoàn thành khám bệnh với bệnh nhân</p>
        </ConfirmDialog>
    )
}

export default DialogConfirmation
