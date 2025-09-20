// backend/app.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const metaRoutes = require('./routes/metaRoutes');

const app = express();

app.use(cors({
    origin:"https://task-frontend-3sa9.onrender.com"
}
));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/meta-metrics', metaRoutes);

app.get('/', (req, res) => res.json({ ok: true, message: 'Meta MoM Backend' }));

module.exports = app;
