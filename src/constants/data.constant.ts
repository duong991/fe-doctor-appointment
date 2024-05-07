const specialists = [
    { label: 'Nhãn khoa', value: '1ef5d817-3d04-4a5f-a8a4-9ef7c2330277' },
    {
        label: 'Ngoại thần kinh',
        value: '2c1d26b5-ea2a-418f-9540-fa56489df84c',
    },
    { label: 'Thần kinh', value: '39c4c531-442f-4a54-ba08-b3431d9757e1' },
    { label: 'Phụ khoa', value: '43b622ed-2c1d-46cd-8900-477ece84a171' },
    { label: 'Tim Mạch', value: '7d2e9106-864f-47a7-8ed7-852b24b1e142' },
    { label: 'Da Liễu', value: 'a5cf9713-520b-4c34-99e6-cbf095009040' },
    { label: 'Nhi Khoa', value: 'c53396c2-9215-4efb-b656-edb0f2302a5e' },
    {
        label: 'Răng hàm mặt',
        value: 'd922a008-b255-4587-901a-0e9d57aad5f4',
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
const defaultImagePath =
    'https://www.google.com/url?sa=i&url=https%3A%2F%2Fvi.pngtree.com%2Ffreebackground%2Fmale-avatar-image-in-the-circle_3377421.html&psig=AOvVaw3rYE-VdSOqKaNvTHkvI2gt&ust=1714980589689000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPigptf-9YUDFQAAAAAdAAAAABAE0'

export { specialists, yoes, genders, defaultImagePath }
