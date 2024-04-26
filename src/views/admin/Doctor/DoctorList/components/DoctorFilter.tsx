import { useState, useRef, forwardRef } from 'react'
import { HiOutlineFilter, HiOutlineSearch } from 'react-icons/hi'
import {
    getProducts,
    setFilterData,
    initialTableData,
    useAppDispatch,
    useAppSelector,
} from '../store'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import Drawer from '@/components/ui/Drawer'
import { Field, Form, Formik, FormikProps, FieldProps } from 'formik'
import type { MouseEvent } from 'react'
import { specialists } from '@/constants/data.constant'

type FormModel = {
    name: string
    specialist: string[]
}

type FilterFormProps = {
    onSubmitComplete?: () => void
}

type DrawerFooterProps = {
    onSaveClick: (event: MouseEvent<HTMLButtonElement>) => void
    onCancel: (event: MouseEvent<HTMLButtonElement>) => void
}

const FilterForm = forwardRef<FormikProps<FormModel>, FilterFormProps>(
    ({ onSubmitComplete }, ref) => {
        const dispatch = useAppDispatch()

        const filterData = useAppSelector(
            (state) => state.doctorList.data.filterData
        )

        const handleSubmit = (values: FormModel) => {
            onSubmitComplete?.()
            dispatch(setFilterData(values))
            dispatch(getProducts(initialTableData))
        }

        return (
            <Formik
                enableReinitialize
                innerRef={ref}
                initialValues={filterData}
                onSubmit={(values) => {
                    handleSubmit(values)
                }}
            >
                {({ values, touched, errors }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                invalid={errors.name && touched.name}
                                errorMessage={errors.name}
                            >
                                <h6 className="mb-4">Từ khóa tìm kiếm</h6>
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="name"
                                    placeholder="Tìm kiếm"
                                    component={Input}
                                    prefix={
                                        <HiOutlineSearch className="text-lg" />
                                    }
                                />
                            </FormItem>
                            <FormItem
                                invalid={
                                    errors.specialist && touched.specialist
                                }
                                errorMessage={errors.specialist as string}
                            >
                                <h6 className="mb-4">Danh mục chuyên khoa</h6>
                                <Field name="specialist">
                                    {({ field, form }: FieldProps) => (
                                        <>
                                            <Checkbox.Group
                                                vertical
                                                value={values.specialist}
                                                onChange={(options) =>
                                                    form.setFieldValue(
                                                        field.name,
                                                        options
                                                    )
                                                }
                                            >
                                                {specialists.map(
                                                    ({ label, value }) => (
                                                        <Checkbox
                                                            key={value}
                                                            className="mb-3"
                                                            name={field.name}
                                                            value={value}
                                                        >
                                                            {label}{' '}
                                                        </Checkbox>
                                                    )
                                                )}
                                            </Checkbox.Group>
                                        </>
                                    )}
                                </Field>
                            </FormItem>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        )
    }
)

const DrawerFooter = ({ onSaveClick, onCancel }: DrawerFooterProps) => {
    return (
        <div className="text-right w-full">
            <Button size="sm" className="mr-2" onClick={onCancel}>
                Hủy bỏ
            </Button>
            <Button size="sm" variant="solid" onClick={onSaveClick}>
                Tìm kiếm
            </Button>
        </div>
    )
}

const DoctorFilter = () => {
    const formikRef = useRef<FormikProps<FormModel>>(null)

    const [isOpen, setIsOpen] = useState(false)

    const openDrawer = () => {
        setIsOpen(true)
    }

    const onDrawerClose = () => {
        setIsOpen(false)
    }

    const formSubmit = () => {
        formikRef.current?.submitForm()
    }

    return (
        <>
            <Button
                size="sm"
                className="block md:inline-block ltr:md:ml-2 rtl:md:mr-2 md:mb-0 mb-4"
                icon={<HiOutlineFilter />}
                onClick={() => openDrawer()}
            >
                Lọc
            </Button>
            <Drawer
                title="Lọc bác sĩ"
                isOpen={isOpen}
                footer={
                    <DrawerFooter
                        onCancel={onDrawerClose}
                        onSaveClick={formSubmit}
                    />
                }
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
            >
                <FilterForm ref={formikRef} onSubmitComplete={onDrawerClose} />
            </Drawer>
        </>
    )
}

FilterForm.displayName = 'FilterForm'

export default DoctorFilter
