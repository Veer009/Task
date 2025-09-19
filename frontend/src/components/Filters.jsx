
import React from 'react';

export default function Filters({ months, platforms, campaigns, value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
      <select value={value.platform || ''} onChange={(e) => onChange({ ...value, platform: e.target.value })}>
        <option value="">All platforms</option>
        {platforms.map((p) => <option key={p} value={p}>{p}</option>)}
      </select>

      <select value={value.campaign || ''} onChange={(e) => onChange({ ...value, campaign: e.target.value })}>
        <option value="">All campaigns</option>
        {campaigns.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>

      <select value={value.from || ''} onChange={(e)=> onChange({...value, from: e.target.value})}>
        <option value="">From</option>
        {months.map(m=> <option key={m} value={m}>{m}</option>)}
      </select>

      <select value={value.to || ''} onChange={(e)=> onChange({...value, to: e.target.value})}>
        <option value="">To</option>
        {months.map(m=> <option key={m} value={m}>{m}</option>)}
      </select>
    </div>
  );
}
