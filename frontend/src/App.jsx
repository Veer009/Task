import React, { useMemo, useState } from 'react';
import useMetrics from './hooks/useMetrics';
import Filters from './components/Filters';
import DataTable from './components/DataTable';
import { TimeSeriesChart, MetricsBarChart } from './components/ChartsPanel';
import { computeKPIs } from './utils/kpis';
import { saveAs } from 'file-saver';

function aggregateByMonth(rows) {
  const map = new Map();
  rows.forEach(r => {
    const key = r.month;
    if (!map.has(key)) map.set(key, { month: key, spend: 0, impressions:0, clicks:0, link_clicks:0, video_views:0, leads:0 });
    const a = map.get(key);
    a.spend += Number(r.spend || 0);
    a.impressions += Number(r.impressions || 0);
    a.clicks += Number(r.clicks || 0);
    a.link_clicks += Number(r.link_clicks || 0);
    a.video_views += Number(r.video_views || 0);
    a.leads += Number(r.leads || 0);
  });
  const arr = Array.from(map.values()).sort((x,y)=> x.month.localeCompare(y.month));
  arr.forEach(a => a.kpis = computeKPIs(a));
  return arr;
}

export default function App() {
  const [filters, setFilters] = useState({});
  const { data, loading } = useMetrics(filters);

  // build filter options from raw data
  const months = Array.from(new Set(data.map(d=>d.month))).sort();
  const platforms = Array.from(new Set(data.map(d=>d.platform)));
  const campaigns = Array.from(new Set(data.map(d=>d.campaign)));

  const aggregated = useMemo(()=> aggregateByMonth(data), [data]);

  const exportCSV = () => {
    const header = ['month','spend','impressions','clicks','CTR','CPC','CPM','CVR'];
    const lines = [header.join(',')];
    aggregated.forEach(a => {
      const row = [
        a.month, a.spend, a.impressions, a.clicks,
        a.kpis.CTR.toFixed(6), a.kpis.CPC.toFixed(2), a.kpis.CPM.toFixed(2), a.kpis.CVR.toFixed(6)
      ];
      lines.push(row.join(','));
    });
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'meta_mom_export.csv');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{padding:20}}>
      <h1>Meta MoM Performance Dashboard</h1>
      <Filters months={months} platforms={platforms} campaigns={campaigns} value={filters} onChange={setFilters} />
      <button onClick={exportCSV}>Export CSV</button>

      <TimeSeriesChart data={aggregated} />
      <MetricsBarChart data={aggregated} />
      <DataTable rows={aggregated} />
    </div>
  );
}
