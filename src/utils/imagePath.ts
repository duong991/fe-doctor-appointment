import appConfig from '@/configs/app.config'
import { EPaymentStatus, EStatus } from '@/constants/data.constant'

export function imagePath(imageName: string) {
    if (imageName.includes('http://') || imageName.includes('https://')) {
        return imageName
    }
    return appConfig.apiPrefix + imageName
}

export const getPaymentStatusLabel = (status: EPaymentStatus): string => {
    switch (status) {
        case EPaymentStatus.PENDING:
            return 'Đang chờ xử lý'
        case EPaymentStatus.SUCCESS:
            return 'Thành công'
        case EPaymentStatus.FAILED:
            return 'Thất bại'
        default:
            return ''
    }
}
export const getAppointmentStatusLabel = (status: EStatus): string => {
    switch (status) {
        case EStatus.APPROVED:
            return 'đã duyệt'
        case EStatus.CANCELLED:
            return 'đã hủy'
        case EStatus.AWAITING_PAYMENT:
            return 'đang chờ thanh toán'
        case EStatus.REJECTED:
            return 'bị từ chối'
        case EStatus.COMPLETED:
            return 'đã hoàn thành'
        default:
            return ''
    }
}
export function extractPText(htmlString: string) {
    const parser = new DOMParser()
    const htmlDoc = parser.parseFromString(htmlString, 'text/html')
    const pElements = htmlDoc.getElementsByTagName('p')
    const pTexts = Array.from(pElements).map((p) => p.textContent)
    return pTexts
}
