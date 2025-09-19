import React from 'react';

export default function DataTable({ rows }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
      <thead>
        <tr>
          <th>Month</th><th>Spend</th><th>Impr</th><th>Clicks</th><th>CTR</th><th>CPC</th><th>CPM</th><th>CVR</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(r => (
          <tr key={r.month}>
            <td>{r.month}</td>
            <td>{Number(r.spend).toLocaleString()}</td>
            <td>{Number(r.impressions).toLocaleString()}</td>
            <td>{Number(r.clicks).toLocaleString()}</td>
            <td>{(r.kpis.CTR*100).toFixed(2)}%</td>
            <td>{r.kpis.CPC.toFixed(2)}</td>
            <td>{r.kpis.CPM.toFixed(2)}</td>
            <td>{(r.kpis.CVR*100).toFixed(2)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
