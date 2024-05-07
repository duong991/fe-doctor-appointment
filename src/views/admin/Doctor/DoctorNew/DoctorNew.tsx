import ProductForm, {
    FormModel,
    SetSubmitting,
} from '@/views/admin/Doctor/DoctorForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiCreateDoctor } from '@/services/DoctorService'

const DoctorNew = () => {
    const navigate = useNavigate()

    const addProduct = async (data: FormModel) => {
        const response = await apiCreateDoctor<boolean, FormModel>(data)
        return response.data.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        console.log('🚀 ~ DoctorNew ~ values:', values)
        setSubmitting(true)
        const success = await addProduct(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Successfuly added'}
                    type="success"
                    duration={2500}
                >
                    Thêm mới doctor thành công
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/doctor')
        }
    }

    const handleDiscard = () => {
        navigate('/doctor')
    }

    return (
        <>
            <ProductForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default DoctorNew
