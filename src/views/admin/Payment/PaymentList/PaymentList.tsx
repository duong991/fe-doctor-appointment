import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import OrdersTable from './components/PaymentTable'
import OrdersTableTools from './components/PaymentTableTools'
import OrderDeleteConfirmation from './components/PaymentDeleteConfirmation'

injectReducer('salesOrderList', reducer)

const PaymentList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Orders</h3>
                <OrdersTableTools />
            </div>
            <OrdersTable />
            <OrderDeleteConfirmation />
        </AdaptableCard>
    )
}

export default PaymentList
