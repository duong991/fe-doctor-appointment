import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import CreatableSelect from 'react-select/creatable'
import Select from '@/components/ui/Select'

type Options = {
    label: string
    value: string
}[]
type FormFieldsName = {
    name: string
    productCode: string
    description: string
}

type BasicInformationFields = {
    values: {
        category: string
        tags: Options
        [key: string]: unknown
    }
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
}

const categories = [
    { label: 'Bags', value: 'bags' },
    { label: 'Cloths', value: 'cloths' },
    { label: 'Devices', value: 'devices' },
    { label: 'Shoes', value: 'shoes' },
    { label: 'Watches', value: 'watches' },
]

const BasicInformationFields = (props: BasicInformationFields) => {
    const { values = { category: '' }, touched, errors } = props

    return (
        <AdaptableCard divider isLastChild className="mb-4">
            <h5>Thông tin cá nhân</h5>
            <FormItem
                label="Tên bác sĩ"
                invalid={(errors.name && touched.name) as boolean}
                errorMessage={errors.name}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="name"
                    placeholder="Name"
                    component={Input}
                />
            </FormItem>
            <div className="col-span-1">
                <FormItem
                    label="Chuyên khoa"
                    invalid={
                        (errors.productCode && touched.productCode) as boolean
                    }
                    errorMessage={errors.productCode}
                >
                    <Field name="category">
                        {({ field, form }: FieldProps) => (
                            <Select
                                field={field}
                                form={form}
                                options={categories}
                                value={categories.filter(
                                    (category) =>
                                        category.value === values.category
                                )}
                                onChange={(option) =>
                                    form.setFieldValue(
                                        field.name,
                                        option?.value
                                    )
                                }
                            />
                        )}
                    </Field>
                </FormItem>
            </div>

            <FormItem
                label="Mô tả"
                labelClass="!justify-start"
                invalid={(errors.description && touched.description) as boolean}
                errorMessage={errors.description}
            >
                <Field name="description">
                    {({ field, form }: FieldProps) => (
                        <RichTextEditor
                            value={field.value}
                            onChange={(val) =>
                                form.setFieldValue(field.name, val)
                            }
                        />
                    )}
                </Field>
            </FormItem>
        </AdaptableCard>
    )
}

export default BasicInformationFields
