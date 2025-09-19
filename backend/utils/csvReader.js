// backend/utils/csvReader.js
const fs = require('fs');
const Papa = require('papaparse');

function normalizeRow(r) {
  return {
    month: r.month || '',
    platform: r.platform || '',
    campaign: r.campaign || '',
    name: r.name || '',
    spend: Number(r.spend || r.Spend || 0) || 0,
    impressions: Number(r.impressions || r.Impressions || 0) || 0,
    reach: Number(r.reach || r.Reach || 0) || 0,
    clicks: Number(r.clicks || r.Clicks || 0) || 0,
    link_clicks: Number(r['link_clicks'] || r['link clicks'] || r['Link Clicks'] || 0) || 0,
    video_views: Number(r['video_views'] || r['video views'] || r['Video Views'] || 0) || 0,
    leads: Number(r.leads || r.Leads || 0) || 0,
    profile_visits: Number(r['profile_visits'] || r['profile visits'] || 0) || 0,
    followers_gained: Number(r['followers_gained'] || r['followers gained'] || 0) || 0,
    page_likes: Number(r['page_likes'] || r['page likes'] || 0) || 0,
  };
}

function readCSV(filePath) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) return resolve([]);
    const csv = fs.readFileSync(filePath, 'utf8');
    const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true });
    const rows = (parsed.data || []).map(normalizeRow);
    resolve(rows);
  });
}

module.exports = readCSV;
