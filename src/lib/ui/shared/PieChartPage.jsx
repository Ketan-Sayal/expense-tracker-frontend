import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Rectangle,
  ResponsiveContainer,
} from "recharts";

const PieChartPage = ({data}) => {
  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
                    <BarChart
                        data={data}
                        margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis/>
                        <Tooltip />
                        <Bar
                            dataKey="income"
                            fill="#B3CDAD"
                            activeBar={<Rectangle fill="pink" stroke="blue" />}
                        />
                        <Bar
                        dataKey="expense"
                        fill="#FF5F5E"
                        activeBar={<Rectangle fill="gold" stroke="purple" />}
                        />
                    </BarChart>
                </ResponsiveContainer>
  )
}

export default PieChartPage
