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
    dob: string
    phone: string
    email: string
    gender: boolean
    img: string
    specialist: string
    services: string
    description: string
    [key: string]: unknown
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

const specialists = [
    { label: 'Da liễu', value: 'xx01' },
    { label: 'Khoa sản', value: 'xx02' },
    { label: 'Xương khớp', value: 'xx01' },
]

const genders = [
    { label: 'Nam', value: 1 },
    { label: 'Nữ', value: 0 },
]

const tags = [
    { label: 'online', value: 'trend' },
    { label: 'offline', value: 'unisex' },
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

const BasicInformationFields = (props: BasicInformationFields) => {
    const { values = { category: '', tags: [] }, touched, errors } = props

    return (
        <AdaptableCard divider isLastChild className="mb-4">
            <h5>Thông tin cá nhân</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Tên bác sĩ"
                        invalid={(errors.name && touched.name) as boolean}
                        errorMessage={errors.name}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="name"
                            placeholder="Họ tên"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Ngày sinh"
                        invalid={(errors.dob && touched.dob) as boolean}
                        errorMessage={errors.dob}
                    >
                        <Field
                            type="date"
                            autoComplete="off"
                            name="dob"
                            placeholder="Ngày sinh"
                            component={Input}
                        />
                    </FormItem>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Số điện thoại"
                        invalid={(errors.phone && touched.phone) as boolean}
                        errorMessage={errors.phone}
                    >
                        <Field
                            type="phone"
                            autoComplete="true"
                            name="phone"
                            placeholder="Số điện thoại"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Email"
                        invalid={(errors.email && touched.email) as boolean}
                        errorMessage={errors.email}
                    >
                        <Field
                            type="email"
                            autoComplete="off"
                            name="email"
                            placeholder="Điền thông tin email"
                            component={Input}
                        />
                    </FormItem>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Giới tính"
                        invalid={(errors.gender && touched.gender) as boolean}
                        errorMessage={errors.gender}
                    >
                        <Field name="gender">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={genders}
                                    value={genders.filter(
                                        (gender) =>
                                            +gender.value === values.gender
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
                <div className="col-span-1">
                    <FormItem
                        label="Số năm kinh nghiệm"
                        invalid={
                            (errors.tags && touched.tags) as unknown as boolean
                        }
                        errorMessage={errors.tags as string}
                    >
                        <Field name="yearsOfExperience">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={yoes}
                                    value={yoes.filter(
                                        (yoe) =>
                                            yoe.value ===
                                            values.yearsOfExperience
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
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Chuyên khoa"
                        invalid={
                            (errors.specialist && touched.specialist) as boolean
                        }
                        errorMessage={errors.specialist}
                    >
                        <Field name="specialist">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={specialists}
                                    value={specialists.filter(
                                        (specialist) =>
                                            specialist.value ===
                                            values.specialist
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
                <div className="col-span-1">
                    <FormItem
                        label="Dịch vụ"
                        invalid={
                            (errors.services &&
                                touched.services) as unknown as boolean
                        }
                        errorMessage={errors.services as string}
                    >
                        <Field name="services">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    isMulti
                                    componentAs={CreatableSelect}
                                    field={field}
                                    form={form}
                                    options={tags}
                                    value={values.services}
                                    onChange={(option) =>
                                        form.setFieldValue(field.name, option)
                                    }
                                />
                            )}
                        </Field>
                    </FormItem>
                </div>
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
