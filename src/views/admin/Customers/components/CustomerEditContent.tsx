import { forwardRef } from 'react'
import {
    setCustomerList,
    putCustomer,
    setDrawerClose,
    useAppDispatch,
    useAppSelector,
    Customer,
} from '../store'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import CustomerForm, { FormikRef, FormModel } from '@/views/admin/CustomerForm'
import dayjs from 'dayjs'

const CustomerEditContent = forwardRef<FormikRef>((_, ref) => {
    const dispatch = useAppDispatch()

    const customer = useAppSelector(
        (state) => state.crmCustomers.data.selectedCustomer
    )
    const data = useAppSelector((state) => state.crmCustomers.data.customerList)
    const { id } = customer

    const onFormSubmit = (values: FormModel) => {
        const { name, dob, email, img, address, phone } = values
        let newData = cloneDeep(data)
        let editedCustomer: Partial<Customer> = {}
        newData = newData.map((elm) => {
            if (elm.id === id) {
                editedCustomer = {
                    id,
                    name,
                    dob: dayjs(dob).format('YYYY-MM-DD'),
                    email,
                    img,
                    address,
                    phone,
                }
                return { ...elm, ...editedCustomer }
            }
            return elm
        })
        if (!isEmpty(editedCustomer)) {
            dispatch(putCustomer(editedCustomer as Customer))
        }
        dispatch(setDrawerClose())
        dispatch(setCustomerList(newData))
    }

    return (
        <CustomerForm
            ref={ref}
            customer={customer}
            onFormSubmit={onFormSubmit}
        />
    )
})

CustomerEditContent.displayName = 'CustomerEditContent'

export type { FormikRef }

export default CustomerEditContent
