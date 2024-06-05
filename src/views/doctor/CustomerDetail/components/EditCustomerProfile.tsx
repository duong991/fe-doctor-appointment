// import { useRef } from 'react'
// import Button from '@/components/ui/Button'
// import Drawer from '@/components/ui/Drawer'
// import {
//     closeEditCustomerDetailDialog,
//     updateProfileData,
//     putCustomer,
//     useAppDispatch,
//     useAppSelector,
//     Customer,
// } from '../store'
// import CustomerForm, { FormikRef, FormModel } from '@/views/admin/CustomerForm'
// import cloneDeep from 'lodash/cloneDeep'
// import dayjs from 'dayjs'

// type DrawerFooterProps = {
//     onSaveClick?: () => void
//     onCancel?: () => void
// }

// const DrawerFooter = ({ onSaveClick, onCancel }: DrawerFooterProps) => {
//     return (
//         <div className="text-right w-full">
//             <Button size="sm" className="mr-2" onClick={onCancel}>
//                 Hủy
//             </Button>
//             <Button size="sm" variant="solid" onClick={onSaveClick}>
//                 Lưu
//             </Button>
//         </div>
//     )
// }

// const EditCustomerProfile = () => {
//     const dispatch = useAppDispatch()

//     const formikRef = useRef<FormikRef>(null)

//     const dialogOpen = useAppSelector(
//         (state) => state.crmCustomerDetails.data.editCustomerDetailDialog
//     )
//     const customer = useAppSelector(
//         (state) => state.crmCustomerDetails.data.profileData
//     )

//     const onDrawerClose = () => {
//         dispatch(closeEditCustomerDetailDialog())
//     }

//     const formSubmit = () => {
//         formikRef.current?.submitForm()
//     }

//     const onFormSubmit = (values: FormModel) => {
//         const clonedData = cloneDeep(customer)
//         const { name, dob, email, img, address, phone } = values

//         const basicInfo = {
//             name,
//             email,
//             img,
//             address,
//             phone,
//             dob: dayjs(dob).format('YYYY-MM-DD'),
//         }
//         // const personalInfo = {
//         //     address,
//         //     birthday: dayjs(birthday).format('DD/MM/YYYY'),
//         //     phoneNumber,
//         // }
//         // clonedData = {
//         //     ...personalInfo,
//         // }
//         const newData = { ...clonedData, ...basicInfo }
//         dispatch(updateProfileData(newData))
//         dispatch(putCustomer(newData as Customer))
//         onDrawerClose()
//     }

//     return (
//         <Drawer
//             isOpen={dialogOpen}
//             closable={false}
//             bodyClass="p-0"
//             footer={
//                 <DrawerFooter
//                     onCancel={onDrawerClose}
//                     onSaveClick={formSubmit}
//                 />
//             }
//             onClose={onDrawerClose}
//             onRequestClose={onDrawerClose}
//         >
//             <CustomerForm
//                 ref={formikRef}
//                 customer={customer}
//                 onFormSubmit={onFormSubmit}
//             />
//         </Drawer>
//     )
// }

// export default EditCustomerProfile
