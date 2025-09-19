import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

export function TimeSeriesChart({ data }) {
  return (
    <div style={{ height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line dataKey="impressions" name="Impressions" />
          <Line dataKey="clicks" name="Clicks" />
          <Line dataKey="spend" name="Spend" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MetricsBarChart({ data }) {
  const barData = data.map(d => ({ month: d.month, CTR: d.kpis.CTR * 100, CPC: d.kpis.CPC, CPM: d.kpis.CPM }));
  return (
    <div style={{ height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={barData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="CTR" name="CTR (%)" />
          <Bar dataKey="CPC" name="CPC" />
          <Bar dataKey="CPM" name="CPM" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
