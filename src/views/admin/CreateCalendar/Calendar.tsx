import { useCallback, useEffect } from 'react'
import CalendarView from '@/components/shared/CalendarView'
import Container from '@/components/shared/Container'
// import EventDialog, { EventParam } from './components/EventDialog'
import reducer, {
    updateEvent,
    useAppDispatch,
    useAppSelector,
    clearAllState,
    createAppointment,
    TCreateAppointmentRequest,
} from './store'
import { injectReducer } from '@/store'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import type { EventDropArg } from '@fullcalendar/core'
import { v4 as uuidv4 } from 'uuid'
import { useLocation, useNavigate } from 'react-router-dom'
import UploadExcel from './components/UploadExcel'
import { Loading } from '@/components/shared'
import { Button } from '@/components/ui'
import { GiCancel } from 'react-icons/gi'
import { IoAddCircleOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Doctors } from '../Doctor/DoctorList/store'

injectReducer('adminCalender', reducer)

const Calendar = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const location = useLocation()
    const selectedRows = location?.state?.selectedRows as string[]
    const listDoctorSelected = location?.state?.listDoctorSelected as Doctors
    const events = useAppSelector((state) => state.adminCalender.data.eventList)
    const isUpload = useAppSelector(
        (state) => state.adminCalender.data.isUpload
    )
    const isLoading = useAppSelector(
        (state) => state.adminCalender.data.loading
    )
    const isNavigateToDoctor = useAppSelector(
        (state) => state.adminCalender.data.isNavigateToDoctor
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const notify = () => {
        toast.info('Tạo mới lịch hẹn thành công', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        })
    }

    const navigateToDoctor = useCallback(() => {
        if (isNavigateToDoctor) {
            notify()
            dispatch(clearAllState())
            navigate('/doctor')
        }
    }, [dispatch, isNavigateToDoctor, navigate, notify])

    useEffect(() => {
        navigateToDoctor()
    }, [navigateToDoctor])
    useEffect(() => {
        if (!selectedRows || selectedRows?.length === 0) {
            navigate('/doctor')
        }
        dispatch(clearAllState())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onEventChange = (arg: EventDropArg) => {
        const newEvents = cloneDeep(events).map((event) => {
            if (arg.event.id === event.id) {
                const { id, extendedProps, start, end, title } = arg.event
                event = {
                    id,
                    start: dayjs(start).format(),
                    end: dayjs(end).format(),
                    title,
                    eventColor: extendedProps.eventColor,
                }
            }
            return event
        })
        dispatch(updateEvent(newEvents))
    }

    const handleAccept = () => {
        const data: TCreateAppointmentRequest = {
            schedule: events,
            listDoctorId: selectedRows,
        }
        dispatch(createAppointment(data))
    }

    const handleCancel = () => {
        dispatch(clearAllState())
    }

    return (
        <Loading loading={isLoading} type="cover">
            {selectedRows ? (
                <Container className="h-full">
                    {isUpload ? (
                        <div className="flex flex-col">
                            <CalendarView
                                editable
                                selectable
                                wrapperClass="h-500"
                                events={events}
                                eventDrop={onEventChange}
                            />
                            <div className="mt-4">
                                <Button
                                    className="mr-2"
                                    variant="solid"
                                    color="red-600"
                                    size="sm"
                                    icon={<GiCancel />}
                                    onClick={handleCancel}
                                >
                                    Hủy bỏ
                                </Button>
                                <Button
                                    className="mr-2"
                                    variant="solid"
                                    color="green-600"
                                    size="sm"
                                    icon={<IoAddCircleOutline />}
                                    onClick={handleAccept}
                                >
                                    Đăng ký lịch hẹn
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <UploadExcel
                            listDoctorId={selectedRows}
                            listDoctorSelected={listDoctorSelected}
                        />
                    )}
                </Container>
            ) : null}
        </Loading>
    )
}

export default Calendar
