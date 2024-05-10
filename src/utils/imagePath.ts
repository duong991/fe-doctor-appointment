import appConfig from '@/configs/app.config'
import { EPaymentStatus } from '@/constants/data.constant'

export function imagePath(imageName: string) {
    if (imageName.includes('http://') || imageName.includes('https://')) {
        return imageName
    }
    return appConfig.apiPrefix + imageName
}

export const getPaymentStatusLabel = (status: EPaymentStatus): string => {
    switch (status) {
        case EPaymentStatus.PENDING:
            return 'pending'
        case EPaymentStatus.SUCCESS:
            return 'success'
        case EPaymentStatus.FAILED:
            return 'failed'
        default:
            return ''
    }
}
