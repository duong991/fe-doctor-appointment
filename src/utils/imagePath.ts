import appConfig from '@/configs/app.config'

export function imagePath(imageName: string) {
    if (imageName.includes('http://') || imageName.includes('https://')) {
        return imageName
    }
    return appConfig.apiPrefix + imageName
}
