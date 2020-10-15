import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RechartAreaChart = ({ data }) => {
    return (
        <ResponsiveContainer height={150}>
            <AreaChart 
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#fdf4cb" stopOpacity={0.9}/>
                        <stop offset="95%" stopColor="#fdf4cb" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="uv" stroke="#f0d15e" fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default RechartAreaChart;