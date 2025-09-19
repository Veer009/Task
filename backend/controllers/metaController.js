// backend/controllers/metaController.js
const path = require('path');
const readCSV = require('../utils/csvReader');

const getMetrics = async (req, res) => {
  try {
    // optional query filters: platform, campaign, from, to
    const { platform, campaign, from, to } = req.query;
    const csvPath = process.env.DATA_FILE || path.join(__dirname, '..', 'data', 'meta-mom-sample.csv');

    const rows = await readCSV(csvPath);

    // normalize/filter
    const filtered = rows.filter((r) => {
      if (platform && String(r.platform).toLowerCase() !== String(platform).toLowerCase()) return false;
      if (campaign && String(r.campaign).toLowerCase() !== String(campaign).toLowerCase()) return false;
      if (from && r.month < from) return false;
      if (to && r.month > to) return false;
      return true;
    });

    res.json({ data: filtered });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to read metrics' });
  }
};

module.exports = { getMetrics };
