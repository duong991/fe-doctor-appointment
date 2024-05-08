import { useEffect } from 'react'
import CalendarView from '@/components/shared/CalendarView'
import Container from '@/components/shared/Container'
import EventDialog, { EventParam } from './components/EventDialog'
import reducer, {
    getEvents,
    updateEvent,
    setSelected,
    openDialog,
    useAppDispatch,
    useAppSelector,
} from './store'
import { injectReducer } from '@/store'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import type {
    EventDropArg,
    EventClickArg,
    DateSelectArg,
} from '@fullcalendar/core'
import { v4 as uuidv4 } from 'uuid'
import { useLocation, useNavigate } from 'react-router-dom'

injectReducer('crmCalendar', reducer)

const Calendar = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const location = useLocation()
    const selectedRows = location?.state?.selectedRows
    const events = useAppSelector((state) => state.crmCalendar.data.eventList)

    useEffect(() => {
        if (!selectedRows || selectedRows?.length === 0) {
            navigate('/doctor')
        }
        // dispatch(getEvents())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onCellSelect = (event: DateSelectArg) => {
        const { start, end } = event
        dispatch(
            setSelected({
                type: 'NEW',
                start: dayjs(start).format(),
                end: dayjs(end).format(),
            })
        )
        dispatch(openDialog())
    }

    const onEventClick = (arg: EventClickArg) => {
        const { start, end, id, title, extendedProps } = arg.event
        dispatch(
            setSelected({
                type: 'EDIT',
                eventColor: extendedProps.eventColor,
                title,
                start,
                end,
                id,
            })
        )
        dispatch(openDialog())
    }

    const onSubmit = (data: EventParam, type: string) => {
        let newEvents = cloneDeep(events)
        if (type === 'NEW') {
            const id = uuidv4()
            newEvents.push({ ...data, id })
        }

        if (type === 'EDIT') {
            newEvents = newEvents.map((event) => {
                if (data.id === event.id) {
                    event = data
                }
                return event
            })
        }
        dispatch(updateEvent(newEvents))
    }

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

    return (
        <div>
            {selectedRows ? (
                <Container className="h-full">
                    <CalendarView
                        editable
                        selectable
                        events={events}
                        // eventClick={onEventClick}
                        // select={onCellSelect}
                        eventDrop={onEventChange}
                    />
                    <EventDialog submit={onSubmit} />
                </Container>
            ) : null}
        </div>
    )
}

export default Calendar
