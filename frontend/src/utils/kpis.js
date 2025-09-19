export function computeKPIs(row) {
  const impressions = Number(row.impressions || 0);
  const clicks = Number(row.clicks || 0);
  const spend = Number(row.spend || 0);
  const leads = Number(row.leads || 0);

  return {
    CTR: impressions > 0 ? clicks / impressions : 0,
    CPC: clicks > 0 ? spend / clicks : 0,
    CPM: impressions > 0 ? (spend / impressions) * 1000 : 0,
    CVR: clicks > 0 ? leads / clicks : 0,
  };
}

export function percentChange(current, prev) {
  if (prev === 0) {
    if (current === 0) return 0;
    return null; // cannot compute %
  }
  return ((current - prev) / prev) * 100;
}
