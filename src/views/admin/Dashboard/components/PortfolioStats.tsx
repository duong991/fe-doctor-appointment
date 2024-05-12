import { useState } from 'react'
import Card from '@/components/ui/Card'
import Segment from '@/components/ui/Segment'
import Chart from '@/components/shared/Chart'
import { NumericFormat } from 'react-number-format'
import isEmpty from 'lodash/isEmpty'
import type { RevStats } from '../store'

type RevStatsProps = {
    data?: Partial<RevStats>
    className?: string
}

const RevStats = ({ data = {}, className }: RevStatsProps) => {
    const [timeRange, setTimeRange] = useState<string[]>(['month'])
    const getTotalRevenue = (timeRange: string) => {
        const seriesData = data[timeRange]?.series[0]?.data || []
        return seriesData.reduce((total, value) => total + value, 0)
    }

    return (
        <Card className={className}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <div>
                    <p>Doanh thu</p>
                    <h4 className="font-bold">
                        {!isEmpty(data) && (
                            <NumericFormat
                                thousandSeparator
                                displayType="text"
                                value={getTotalRevenue(timeRange[0])}
                                suffix=" VND"
                            />
                        )}
                    </h4>
                </div>
                <Segment
                    value={timeRange}
                    size="sm"
                    onChange={(val) => setTimeRange(val as string[])}
                >
                    <Segment.Item value="week">Tuần</Segment.Item>
                    <Segment.Item value="month">Tháng</Segment.Item>
                    <Segment.Item value="year">Năm</Segment.Item>
                </Segment>
            </div>
            {!isEmpty(data) && (
                <Chart
                    series={data[timeRange[0]]?.series}
                    xAxis={data[timeRange[0]]?.timeRange}
                    height="350px"
                    customOptions={{ legend: { show: false } }}
                />
            )}
        </Card>
    )
}

export default RevStats
