export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function fetchMetrics({ platform, campaign, from, to } = {}) {
  const params = new URLSearchParams();
  if (platform) params.append('platform', platform);
  if (campaign) params.append('campaign', campaign);
  if (from) params.append('from', from);
  if (to) params.append('to', to);
  const url = `${API_URL}/api/meta-metrics?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch metrics');
  return res.json();
}
