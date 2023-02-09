import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
  } from "recharts";
  
 
  
  export default function DetailChart({chartData}) {
    console.log(chartData)
    return (
      <div className={`flex flex-1`}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            width={1200}
            height={400}
            data={chartData}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 0
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis  dataKey="date" ticks={[]} scale="auto" interval="preserveEnd" minTickGap={50}  type="category" tickMargin="10"  />
            <YAxis   yAxisId="left" width={40} type="number" domain={['auto', 'auto']}/>
            <YAxis yAxisId="right" width={56}   type="number" domain={['auto', 'auto']} orientation="right" className={`text-sm`} />
            <Tooltip />
            <Legend/>
            <Line
            dot={false}
              yAxisId="left"
              type="linear"
              dataKey="risk"
              stroke="#DC2626"
              activeDot={{ r: 4 }}
              connectNulls={true}
              strokeWidth={2}
            />
            <Line yAxisId="right" connectNulls={true} type="linear" strokeWidth={2} dataKey="price" stroke="#34D399" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  