import {
    Container,
    DoubleSidedImage,
    UsersAvatarGroup,
} from '@/components/shared'
import Upload from '@/components/ui/Upload'
import { uploadExcel, useAppDispatch, useAppSelector } from '../store'
import { Doctors } from '../../Doctor/DoctorList/store'

const UploadExcel = ({
    listDoctorId,
    listDoctorSelected,
}: {
    listDoctorId: string[]
    listDoctorSelected: Doctors
}) => {
    const dispatch = useAppDispatch()
    const events = useAppSelector((state) => state.adminCalender.data.eventList)
    console.log('🚀 ~ UploadExcel ~ events:', events)
    const isUpload = useAppSelector(
        (state) => state.adminCalender.data.isUpload
    )

    const maxUpload = 1
    const members = listDoctorSelected?.map((member) => {
        return {
            id: member.id,
            name: member.name,
            email: '',
            img: member.img,
        }
    })

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

        if (typeof valid === 'boolean' && valid) {
            if (files) {
                dispatch(uploadExcel({ file: files[0], listDoctorId }))
            } else {
                return false
            }

            // call api upload
            // Assuming you have a function uploadFile that takes formData as argument
            // await uploadFile(formData)
        }

        return valid
    }

    return (
        <div className={'w-full'}>
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
                    </Container>
                    <Upload
                        draggable
                        className="mt-2"
                        beforeUpload={beforeUpload}
                        showList={false}
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
        </div>
    )
}

export default UploadExcel
