import { useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import reducer, {
    getDoctorDetail,
    updateDoctor,
    deleteProduct,
    useAppSelector,
    useAppDispatch,
} from './store'
import { injectReducer } from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'

import ProductForm, {
    FormModel,
    SetSubmitting,
    OnDeleteCallback,
} from '@/views/admin/Doctor/DoctorForm'
import isEmpty from 'lodash/isEmpty'

injectReducer('doctorEdit', reducer)

const DoctorEdit = () => {
    const dispatch = useAppDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const productData = useAppSelector(
        (state) => state.doctorEdit.data.doctorData
    )
    const loading = useAppSelector((state) => state.doctorEdit.data.loading)

    const fetchData = (data: { id: string }) => {
        dispatch(getDoctorDetail(data))
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        dispatch(updateDoctor(values))
        setSubmitting(false)
    }

    const handleDiscard = () => {
        navigate('/doctor')
    }

    const handleDelete = async (setDialogOpen: OnDeleteCallback) => {
        setDialogOpen(false)
        const success = await deleteProduct({ id: productData.id })
        if (success) {
            popNotification('deleted')
        }
    }

    const popNotification = (keyword: string) => {
        toast.push(
            <Notification
                title={`Thành công ${keyword}`}
                type="success"
                duration={2500}
            >
                Chỉnh sửa thông tin bác sĩ thành công {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/doctor')
    }

    useEffect(() => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        const rquestParam = { id: path }
        fetchData(rquestParam)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    return (
        <>
            <Loading loading={loading}>
                {!isEmpty(productData) && (
                    <>
                        <ProductForm
                            type="edit"
                            initialData={productData}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                            onDelete={handleDelete}
                        />
                    </>
                )}
            </Loading>
            {!loading && isEmpty(productData) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="Không tìm thấy bác sĩ!"
                    />
                    <h3 className="mt-8">Không tìm thấy bác sĩ</h3>
                </div>
            )}
        </>
    )
}

export default DoctorEdit
