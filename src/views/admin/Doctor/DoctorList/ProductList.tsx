import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import DoctorTable from './components/DoctorTable'
import DoctorTableTools from './components/DoctorTableTools'

injectReducer('salesProductList', reducer)

const DoctorList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Bác sĩ</h3>
                <DoctorTableTools />
            </div>
            <DoctorTable />
        </AdaptableCard>
    )
}

export default DoctorList
