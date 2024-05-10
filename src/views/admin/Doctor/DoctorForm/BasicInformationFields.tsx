import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import Select from '@/components/ui/Select'
import { genders, specialists, yoes } from '@/constants/data.constant'

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
    address: string
    description: string
    [key: string]: unknown
}

type BasicInformationFields = {
    values: {
        specialist: string
        [key: string]: unknown
    }
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
}

const BasicInformationFields = (props: BasicInformationFields) => {
    const { values = { specialist: '' }, touched, errors } = props

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
                            autoComplete="true"
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
                                            Boolean(gender.value) ===
                                            Boolean(values.gender)
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
                        label="Địa chỉ"
                        invalid={(errors.address && touched.address) as boolean}
                        errorMessage={errors.address}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="address"
                            placeholder="Địa chỉ"
                            component={Input}
                        />
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
