require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const cron = require('node-cron');

const { errorHandler } = require('./middleware/errorHandler');

// Initialize app
const app = express();

// Global Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes (to be implemented)
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/challenges', require('./routes/challenges'));
app.use('/api/insights', require('./routes/insights'));
app.use('/api/projection', require('./routes/projection'));
app.use('/api/leaderboard', require('./routes/leaderboard'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// Error Handling Middleware
app.use(errorHandler);

// Background Jobs
const { runWeeklyReset } = require('./services/leaderboard_engine');
const { checkFestiveMode } = require('./data_integration/festive_scheduler');

// Schedule Weekly XP Reset (Every Monday at 00:00)
cron.schedule('0 0 * * 1', async () => {
  console.log('Running weekly leaderboard reset and reward allocation...');
  await runWeeklyReset();
});

// Schedule Festive Mode Check (Daily at 00:00)
cron.schedule('0 0 * * *', async () => {
  console.log('Checking for upcoming festive modes...');
  // Logic inside data_integration/festive_scheduler
  checkFestiveMode();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 DuitSense Backend running on port ${PORT}`);
});
