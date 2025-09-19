// backend/routes/metaRoutes.js
const express = require('express');
const router = express.Router();
const metaController = require('../controllers/metaController');

// GET /api/meta-metrics
router.get('/', metaController.getMetrics);

module.exports = router;
