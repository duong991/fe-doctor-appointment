import classNames from 'classnames'
import Badge from '@/components/ui/Badge'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { CalendarOptions } from '@fullcalendar/core'
import viLocale from '@fullcalendar/core/locales/vi'
import Upload from '@/components/ui/Upload'
import Button from '@/components/ui/Button'
import { GiCancel } from 'react-icons/gi'
import { IoAddCircleOutline } from 'react-icons/io5'
import useAuth from '@/utils/hooks/useAuth'
import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from 'react'
import DoubleSidedImage from './DoubleSidedImage'
import { useLocation } from 'react-router-dom'
import UsersAvatarGroup from './UsersAvatarGroup'
import Container from './Container'
import { HiOutlineCog, HiOutlineUserAdd } from 'react-icons/hi'
import BoardAddNewColumn from '@/views/doctor/project/ScrumBoard/components/BoardAddNewColumn'

type EventColors = Record<
    string,
    {
        bg: string
        text: string
        dot: string
    }
>

interface CalendarViewProps extends CalendarOptions {
    wrapperClass?: string
    eventColors?: (colors: EventColors) => EventColors
}

const defaultColorList: Record<
    string,
    {
        bg: string
        text: string
        dot: string
    }
> = {
    red: {
        bg: 'bg-red-50 dark:bg-red-500/10',
        text: 'text-red-500 dark:text-red-100',
        dot: 'bg-red-500',
    },
    orange: {
        bg: 'bg-orange-50 dark:bg-orange-500/10',
        text: 'text-orange-500 dark:text-orange-100',
        dot: 'bg-orange-500',
    },
    amber: {
        bg: 'bg-amber-50 dark:bg-amber-500/10',
        text: 'text-amber-500 dark:text-amber-100',
        dot: 'bg-amber-500',
    },
    yellow: {
        bg: 'bg-yellow-50 dark:bg-yellow-500/10',
        text: 'text-yellow-500 dark:text-yellow-100',
        dot: 'bg-yellow-500',
    },
    lime: {
        bg: 'bg-lime-50 dark:bg-lime-500/10',
        text: 'text-lime-500 dark:text-lime-100',
        dot: 'bg-lime-500',
    },
    green: {
        bg: 'bg-green-50 dark:bg-green-500/10',
        text: 'text-green-500 dark:text-green-100',
        dot: 'bg-green-500',
    },
    emerald: {
        bg: 'bg-emerald-50 dark:bg-emerald-500/10',
        text: 'text-emerald-500 dark:text-emerald-100',
        dot: 'bg-emerald-500',
    },
    teal: {
        bg: 'bg-teal-50 dark:bg-teal-500/10',
        text: 'text-teal-500 dark:text-teal-100',
        dot: 'bg-teal-500',
    },
    cyan: {
        bg: 'bg-cyan-50 dark:bg-cyan-500/10',
        text: 'text-cyan-500 dark:text-cyan-100',
        dot: 'bg-cyan-500',
    },
    sky: {
        bg: 'bg-sky-50 dark:bg-sky-500/10',
        text: 'text-sky-500 dark:text-sky-100',
        dot: 'bg-sky-500',
    },
    blue: {
        bg: 'bg-blue-50 dark:bg-blue-500/10',
        text: 'text-blue-500 dark:text-blue-100',
        dot: 'bg-blue-500',
    },
    indigo: {
        bg: 'bg-indigo-50 dark:bg-indigo-500/10',
        text: 'text-indigo-500 dark:text-indigo-100',
        dot: 'bg-indigo-500',
    },
    purple: {
        bg: 'bg-purple-50 dark:bg-purple-500/10',
        text: 'text-purple-500 dark:text-purple-100',
        dot: 'bg-purple-500',
    },
    fuchsia: {
        bg: 'bg-fuchsia-50 dark:bg-fuchsia-500/10',
        text: 'text-fuchsia-500 dark:text-fuchsia-100',
        dot: 'bg-fuchsia-500',
    },
    pink: {
        bg: 'bg-pink-50 dark:bg-pink-500/10',
        text: 'text-pink-500 dark:text-pink-100',
        dot: 'bg-pink-500',
    },
    rose: {
        bg: 'bg-rose-50 dark:bg-rose-500/10',
        text: 'text-rose-500 dark:text-rose-100',
        dot: 'bg-rose-500',
    },
}
const CalendarContext = createContext<{
    openCalender: boolean
    setOpenCalender: Dispatch<SetStateAction<boolean>>
} | null>(null)

const CalendarProvider = ({ children }) => {
    const [openCalender, setOpenCalender] = useState(false)

    return (
        <CalendarContext.Provider value={{ openCalender, setOpenCalender }}>
            {children}
        </CalendarContext.Provider>
    )
}
const useCalendar = () => {
    const context = useContext(CalendarContext)
    if (!context) {
        throw new Error('useCalendar must be used within a CalendarProvider')
    }
    return context
}

const BeforeUpload = () => {
    const { openCalender, setOpenCalender } = useCalendar()
    const maxUpload = 1

    const members = [
        {
            id: '1',
            name: 'Carolyn Perkins',
            email: 'eileen_h@hotmail.com',
            img: '/img/avatars/thumb-1.jpg',
        },
        {
            id: '2',
            name: 'Terrance Moreno',
            email: 'terrance_moreno@infotech.io',
            img: '/img/avatars/thumb-2.jpg',
        },
        {
            id: '3',
            name: 'Ron Vargas',
            email: 'ronnie_vergas@infotech.io',
            img: '/img/avatars/thumb-3.jpg',
        },
        {
            id: '5',
            name: 'Joyce Freeman',
            email: 'joyce991@infotech.io',
            img: '/img/avatars/thumb-5.jpg',
        },
        {
            id: '7',
            name: 'Tara Fletcher',
            email: 'taratarara@imaze.edu.du',
            img: '/img/avatars/thumb-7.jpg',
        },
        {
            id: '9',
            name: 'Carolyn Hanson',
            email: 'carolyn_h@gmail.com',
            img: '/img/avatars/thumb-9.jpg',
        },
        {
            id: '10',
            name: 'Brittany Hale',
            email: 'brittany1134@gmail.com',
            img: '/img/avatars/thumb-10.jpg',
        },
    ]

    const beforeUpload = (
        files: FileList | null,
        fileList: File[]
    ): boolean | string => {
        let valid: string | boolean = true

        const allowedFileType = [
            'xlsx',
            'xls',
            'csv',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ]

        if (fileList.length >= maxUpload) {
            return `Bạn chỉ được tải lên ${maxUpload} file.`
        }

        if (files) {
            for (const f of files) {
                if (!allowedFileType.includes(f.type)) {
                    console.log('🚀 ~ beforeUpload ~ f.type:', f.type)
                    valid = 'Tải lên file excel'
                }
            }
        }

        // call api upload if valid
        if (typeof valid === 'boolean' && valid) {
            const formData = new FormData()
            if (files) {
                console.log('🚀 ~ beforeUpload ~ files:', files)
                formData.append('file', files[0])
                console.log('send file ', formData)
            }

            // call api upload
            // Assuming you have a function uploadFile that takes formData as argument
            // await uploadFile(formData)
        }

        return valid
    }

    return (
        <div className={openCalender ? '' : 'w-full'}>
            {openCalender ? (
                <></>
            ) : (
                <>
                    <div className="pt-8 pb-4 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
                        <Container className="px-6">
                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <p className="mb-1">Lịch hẹn</p>
                                    <h3>Tạo mới lịch hẹn cho bác sĩ</h3>
                                </div>
                                <UsersAvatarGroup users={members} />
                            </div>
                            {/* <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <Button
                                        size="sm"
                                        icon={<HiOutlineUserAdd />}
                                    />
                                </div>
                            </div> */}
                        </Container>
                        <Upload
                            className="mt-2"
                            draggable
                            beforeUpload={beforeUpload}
                            showList={false}
                            onChange={(files) => setOpenCalender(true)}
                        >
                            <div className="w-4/5 mx-auto my-16 text-center">
                                <DoubleSidedImage
                                    className="mx-auto"
                                    src="/img/others/upload.png"
                                    darkModeSrc="/img/others/upload-dark.png"
                                />
                                <p className="font-semibold">
                                    <span className="text-gray-800 dark:text-white">
                                        Đẩy lên file excel
                                    </span>
                                </p>
                                <p className="mt-1 opacity-60 dark:text-white">
                                    Support: excel
                                </p>
                            </div>
                        </Upload>
                    </div>
                </>
            )}
        </div>
    )
}

const CalendarView = (props: CalendarViewProps) => {
    const { user } = useAuth()
    const { openCalender, setOpenCalender } = useCalendar()
    const role = user?.role
    const {
        wrapperClass,
        eventColors = () => defaultColorList,
        ...rest
    } = props

    const handleCancel = () => {
        setOpenCalender(false)
    }

    const handleAccept = () => {
        setOpenCalender(false)
    }

    return (
        <>
            {!openCalender && (
                <div className="w-full">
                    <BeforeUpload />
                </div>
            )}

            {openCalender && (
                <div className={classNames('calendar relative', wrapperClass)}>
                    <div className="absolute top-0 w-full z-0 flex  justify-end">
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

                    <FullCalendar
                        locales={[viLocale]}
                        locale="vi"
                        initialView={
                            role === 'doctor' ? 'timeGridWeek' : 'dayGridMonth'
                        }
                        titleFormat={{
                            month: '2-digit',
                            year: 'numeric',
                            day: '2-digit',
                            weekday: 'short',
                        }}
                        headerToolbar={{
                            left: 'title',
                            center: 'dayGridMonth,timeGridWeek,timeGridDay',
                            right: '',
                        }}
                        eventContent={(arg) => {
                            const { extendedProps } = arg.event
                            const { isEnd, isStart } = arg
                            return (
                                <div
                                    className={classNames(
                                        'custom-calendar-event',
                                        extendedProps.eventColor
                                            ? (eventColors(defaultColorList) ||
                                                  defaultColorList)[
                                                  extendedProps.eventColor
                                              ]?.bg
                                            : '',
                                        extendedProps.eventColor
                                            ? (eventColors(defaultColorList) ||
                                                  defaultColorList)[
                                                  extendedProps.eventColor
                                              ]?.text
                                            : '',
                                        isEnd &&
                                            !isStart &&
                                            '!rounded-tl-none !rounded-bl-none !rtl:rounded-tr-none !rtl:rounded-br-none',
                                        !isEnd &&
                                            isStart &&
                                            '!rounded-tr-none !rounded-br-none !rtl:rounded-tl-none !rtl:rounded-bl-none'
                                    )}
                                >
                                    {!(isEnd && !isStart) && (
                                        <Badge
                                            className={classNames(
                                                'mr-1 rtl:ml-1',
                                                extendedProps.eventColor
                                                    ? (eventColors(
                                                          defaultColorList
                                                      ) || defaultColorList)[
                                                          extendedProps
                                                              .eventColor
                                                      ].dot
                                                    : ''
                                            )}
                                        />
                                    )}
                                    {!(isEnd && !isStart) && (
                                        <span>{arg.timeText}</span>
                                    )}
                                    <span className="font-semibold ml-1 rtl:mr-1">
                                        {arg.event.title}
                                    </span>
                                </div>
                            )
                        }}
                        plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                        ]}
                        {...rest}
                    />
                </div>
            )}
        </>
    )
}

const App = (props: CalendarViewProps) => {
    const location = useLocation()
    const selectedRows = location.state.selectedRows
    console.log('🚀 ~ App ~ selectedRows:', selectedRows)
    return (
        <CalendarProvider>
            <CalendarView {...props} />
        </CalendarProvider>
    )
}

export default App
