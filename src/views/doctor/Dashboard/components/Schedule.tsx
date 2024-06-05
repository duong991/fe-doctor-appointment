import { useCallback, useState } from 'react'
import classNames from 'classnames'
import Card from '@/components/ui/Card'
import Calendar from '@/components/ui/Calendar'
import Badge from '@/components/ui/Badge'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { HiVideoCamera, HiOutlineEye } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { MdDone } from 'react-icons/md'
import { injectReducer, useAppDispatch } from '@/store'
import reducer, { setScheduleSelected } from '../store'
import Tooltip from '@/components/ui/Tooltip'

type ScheduleProps = {
    data?: {
        id: string
        scheduleTime: string
        patientName: string
    }[]
}

const isToday = (someDate: Date) => {
    const today = new Date()
    return (
        someDate.getDate() === today.getDate() &&
        someDate.getMonth() === today.getMonth() &&
        someDate.getFullYear() === today.getFullYear()
    )
}

const EventIcon = () => {
    const baseClass =
        'rounded-lg h-10 w-10 text-lg flex items-center justify-center'

    return (
        <div
            className={classNames(
                baseClass,
                'text-indigo-600 bg-indigo-100 dark:text-indigo-100 dark:bg-indigo-500/20'
            )}
        >
            <HiVideoCamera />
        </div>
    )
}

injectReducer('projectDashboard', reducer)

const Schedule = ({ data = [] }: ScheduleProps) => {
    const [value, setValue] = useState<Date | null>()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { textTheme } = useThemeClass()

    const navigationToRoomId = (_roomId: string) => {
        const roomId = _roomId
        window.open(`http://localhost:5173/room?roomId=${roomId}`, '_blank')
    }
    const handleSubmit = (id: string) => {
        console.log('🚀 ~ handleSubmit ~ id:', id)
        dispatch(
            setScheduleSelected({
                id,
                type: 'online',
            })
        )
    }
    const onView = useCallback(
        (id: string) => {
            navigate(`/appointment-detail/${id}`)
        },
        [navigate]
    )
    return (
        <Card className="mb-4">
            <div className="mx-auto max-w-[420px]">
                <Calendar
                    value={value}
                    dayClassName={(date, { selected }) => {
                        const defaultClass = 'text-base'

                        if (isToday(date) && !selected) {
                            return classNames(defaultClass, textTheme)
                        }

                        if (selected) {
                            return classNames(defaultClass, 'text-white')
                        }

                        return defaultClass
                    }}
                    dayStyle={() => {
                        return { height: 48 }
                    }}
                    renderDay={(date) => {
                        const day = date.getDate()

                        if (!isToday(date)) {
                            return <span>{day}</span>
                        }

                        return (
                            <span className="relative flex justify-center items-center w-full h-full">
                                {day}
                                <Badge
                                    className="absolute bottom-1"
                                    innerClass="h-1 w-1"
                                />
                            </span>
                        )
                    }}
                    onChange={(val) => {
                        setValue(val)
                    }}
                />
            </div>
            <hr className="my-6" />
            <h5 className="mb-4">Lịch hẹn online trong ngày</h5>
            {data.map((event) => (
                <div
                    key={event.id}
                    className="flex items-center justify-between rounded-md mb-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-600/40 cursor-pointer user-select"
                >
                    <div
                        className="flex items-center gap-3"
                        onClick={() => navigationToRoomId(event.id)}
                    >
                        <EventIcon />
                        <div>
                            <h6 className="text-sm font-bold">Bệnh nhân</h6>
                            <p>{event.patientName}</p>
                            <p>{event.scheduleTime}</p>
                        </div>
                    </div>
                    <div className="flex justify-end text-lg">
                        <Tooltip title="Xem chi tiết">
                            <span
                                className={`cursor-pointer p-2 hover:${textTheme}`}
                                onClick={() => onView(event.id)}
                            >
                                <HiOutlineEye size={18} />
                            </span>
                        </Tooltip>
                        <Tooltip title="Hoàn thành">
                            <span
                                className="text-sm font-bold text-green-600  cursor-pointer
                            border-spacing-2 border-green-600 rounded-full p-2 hover:bg-green-600 hover:text-white"
                                onClick={() => handleSubmit(event.id)}
                            >
                                <MdDone size={18} />
                            </span>
                        </Tooltip>
                    </div>
                </div>
            ))}
        </Card>
    )
}

export default Schedule
