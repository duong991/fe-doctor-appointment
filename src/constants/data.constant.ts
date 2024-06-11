const specialists = [
    { label: 'Nhãn khoa', value: 'efa885d5-3365-49c8-8e73-e21bd4e9513e' },
    {
        label: 'Ngoại thần kinh',
        value: 'd545dac7-5f37-4976-9de0-afc4a3d0575f',
    },
    { label: 'Thần kinh', value: '84a70fca-ba9a-47e1-9e15-c7f10a247d90' },
    { label: 'Phụ khoa', value: '09865999-781f-42cf-bb5e-e12feb62807d' },
    { label: 'Tim Mạch', value: '9b1eb80a-90ed-4afe-a65a-a463c947b129' },
    { label: 'Da Liễu', value: '36fe4b6a-473b-439c-a6ef-46f46f4e8dea' },
    { label: 'Nhi Khoa', value: '85867033-80c8-4c9d-affa-349e7e34af4c' },
    {
        label: 'Răng hàm mặt',
        value: 'f90c2175-b205-40ef-a65f-94f560abc131',
    },
]

const yoes = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' },
    { label: '13', value: '13' },
    { label: '14', value: '14' },
    { label: '15', value: '15' },
    { label: '16', value: '16' },
    { label: '17', value: '17' },
    { label: '18', value: '18' },
    { label: '19', value: '19' },
    { label: '20+', value: '20+' },
]

const genders = [
    { label: 'Nam', value: 1 },
    { label: 'Nữ', value: 0 },
]

export enum EStatus {
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED',
    AWAITING_PAYMENT = 'AWAITING_PAYMENT',
}

export enum EPaymentType {
    ONLINE = 'ONLINE',
    SMARTCARD = 'SMARTCARD',
}
export enum EPaymentStatus {
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
}
const defaultImagePath = '/img/avatars/thumb-1.jpg'

export { specialists, yoes, genders, defaultImagePath }
