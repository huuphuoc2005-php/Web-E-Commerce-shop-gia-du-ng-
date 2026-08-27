"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
interface AdminChartProps {
  data: {
    name: string;
    total: number;
  }[];
}

export default function AdminChart({ data }: AdminChartProps) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#9CA3AF', fontSize: 12}} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#9CA3AF', fontSize: 12}} 
            tickFormatter={(value) => `${value / 1000}k`}
          />
          <Tooltip 
             cursor={{fill: '#F3F4F6'}}
             contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
          />
          <Bar 
            dataKey="total" 
            fill="#2563EB" 
            radius={[4, 4, 0, 0]} 
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}