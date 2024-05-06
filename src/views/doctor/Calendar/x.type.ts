export interface CalendarEvent {
    maxPatient: number
    month: number
    year: number
    schedules: Schedule[]
}

export interface Schedule {
    date: string
    appointments: Appointment[]
}

export interface Appointment {
    id: string
    time: string
    type: string
}

export enum Time {
    T3 = 'T3',
    T4 = 'T4',
    T5 = 'T5',
    T6 = 'T6',
    T7 = 'T7',
    T8 = 'T8',
}

export enum Type {
    Offline = 'Offline',
    Online = 'Online',
}
