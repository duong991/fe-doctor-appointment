import { forwardRef, useState } from 'react'
import { FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import hooks from '@/components/ui/hooks'
import StickyFooter from '@/components/shared/StickyFooter'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { Form, Formik, FormikProps } from 'formik'
import BasicInformationFields from './BasicInformationFields'
import PricingFields from './PricingFields'
import OrganizationFields from './OrganizationFields'
import ProductImages from './DoctorImages'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type FormikRef = FormikProps<any>

type InitialData = {
    id?: string
    name?: string
    dob?: string
    phone?: string
    email?: string
    gender?: boolean
    img?: string
    imgList?: {
        id: string
        name: string
        img: string
    }[]
    yearsOfExperience?: string
    specialist?: string
    services?: string[]
    onlinePrice?: number
    offlinePrice?: number
    description?: string
}

export type FormModel = Omit<InitialData, 'services'> & {
    services: { label: string; value: string }[] | string[]
}

export type SetSubmitting = (isSubmitting: boolean) => void

export type OnDeleteCallback = React.Dispatch<React.SetStateAction<boolean>>

type OnDelete = (callback: OnDeleteCallback) => void

type ProductForm = {
    initialData?: InitialData
    type: 'edit' | 'new'
    onDiscard?: () => void
    onDelete?: OnDelete
    onFormSubmit: (formData: FormModel, setSubmitting: SetSubmitting) => void
}

const { useUniqueId } = hooks

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Tên bác sĩ không được để trống'),
    dob: Yup.date().required('Ngày sinh không được để trống'),
    phone: Yup.string().required('Số điện thoại không được để trống'),
    email: Yup.string()
        .email('Email không hợp lệ')
        .required('Email không được để trống'),
    gender: Yup.boolean().required('Điền giới tính cho bác sĩ'),
    specialist: Yup.string().required('Chọn chuyên khoa của bác sĩ'),
    services: Yup.string().required('Chọn dịch vu của bác sĩ'),
})

const DeleteProductButton = ({ onDelete }: { onDelete: OnDelete }) => {
    const [dialogOpen, setDialogOpen] = useState(false)

    const onConfirmDialogOpen = () => {
        setDialogOpen(true)
    }

    const onConfirmDialogClose = () => {
        setDialogOpen(false)
    }

    const handleConfirm = () => {
        onDelete?.(setDialogOpen)
    }

    return (
        <>
            <Button
                className="text-red-600"
                variant="plain"
                size="sm"
                icon={<HiOutlineTrash />}
                type="button"
                onClick={onConfirmDialogOpen}
            >
                Delete
            </Button>
            <ConfirmDialog
                isOpen={dialogOpen}
                type="danger"
                title="Delete product"
                confirmButtonColor="red-600"
                onClose={onConfirmDialogClose}
                onRequestClose={onConfirmDialogClose}
                onCancel={onConfirmDialogClose}
                onConfirm={handleConfirm}
            >
                <p>
                    Bạn có chắc chắn muốn xóa bác sĩ này không? Tất cả các hồ sơ
                    liên quan đến bác sĩ này cũng sẽ bị xóa. Hành động này không
                    thể hoàn tác.
                </p>
            </ConfirmDialog>
        </>
    )
}

const ProductForm = forwardRef<FormikRef, ProductForm>((props, ref) => {
    const {
        type,
        initialData = {
            id: '',
            name: '',
            dob: '',
            phone: '',
            email: '',
            gender: true,
            img: '',
            imgList: [],
            specialist: '',
            services: [],
            onlinePrice: 0,
            offlinePrice: 0,
            description: '',
        },
        onFormSubmit,
        onDiscard,
        onDelete,
    } = props

    const newId = useUniqueId('doctor-')

    return (
        <>
            <Formik
                innerRef={ref}
                initialValues={{
                    ...initialData,
                    services: initialData?.services
                        ? initialData.services.map((value) => ({
                              label: value,
                              value,
                          }))
                        : [],
                }}
                validationSchema={validationSchema}
                onSubmit={(values: FormModel, { setSubmitting }) => {
                    const formData = cloneDeep(values)
                    formData.services = formData.services.map((service) => {
                        if (typeof service !== 'string') {
                            return service.value
                        }
                        return service
                    })
                    if (type === 'new') {
                        formData.id = newId
                        if (formData.imgList && formData.imgList.length > 0) {
                            formData.img = formData.imgList[0].img
                        }
                    }
                    onFormSubmit?.(formData, setSubmitting)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2">
                                    <BasicInformationFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    />
                                    <PricingFields
                                        touched={touched}
                                        errors={errors}
                                    />
                                </div>
                                <div className="lg:col-span-1">
                                    <ProductImages values={values} />
                                </div>
                            </div>
                            <StickyFooter
                                className="-mx-8 px-8 flex items-center justify-between py-4"
                                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            >
                                <div>
                                    {type === 'edit' && (
                                        <DeleteProductButton
                                            onDelete={onDelete as OnDelete}
                                        />
                                    )}
                                </div>
                                <div className="md:flex items-center">
                                    <Button
                                        size="sm"
                                        className="ltr:mr-3 rtl:ml-3"
                                        type="button"
                                        onClick={() => onDiscard?.()}
                                    >
                                        Discard
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="solid"
                                        loading={isSubmitting}
                                        icon={<AiOutlineSave />}
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </StickyFooter>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </>
    )
})

ProductForm.displayName = 'ProductForm'

export default ProductForm
