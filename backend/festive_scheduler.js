const cron = require('node-cron');
const db = require('./db_config');
const { differenceInDays } = require('date-fns');

// Hardcoded dates for major Malaysian festivals (next 5 years)
// Format: YYYY-MM-DD
const FESTIVALS = [
  // Hari Raya Aidilfitri (Approximate, usually confirmed by sighting)
  { name: 'Hari Raya Aidilfitri', date: '2024-04-10' },
  { name: 'Hari Raya Aidilfitri', date: '2025-03-31' },
  { name: 'Hari Raya Aidilfitri', date: '2026-03-20' },
  { name: 'Hari Raya Aidilfitri', date: '2027-03-10' },
  { name: 'Hari Raya Aidilfitri', date: '2028-02-28' },
  
  // Chinese New Year
  { name: 'Chinese New Year', date: '2024-02-10' },
  { name: 'Chinese New Year', date: '2025-01-29' },
  { name: 'Chinese New Year', date: '2026-02-17' },
  { name: 'Chinese New Year', date: '2027-02-06' },
  { name: 'Chinese New Year', date: '2028-01-26' },

  // Deepavali
  { name: 'Deepavali', date: '2024-10-31' },
  { name: 'Deepavali', date: '2025-10-20' },
  { name: 'Deepavali', date: '2026-11-08' },
  { name: 'Deepavali', date: '2027-10-29' },
  { name: 'Deepavali', date: '2028-10-17' },
];

/**
 * Checks if today is exactly 42 days (6 weeks) before any festival.
 * If so, activates festive mode for all users.
 */
async function checkAndActivateFestiveMode() {
  const today = new Date();
  
  const upcomingFestival = FESTIVALS.find(festival => {
    const festDate = new Date(festival.date);
    const diff = differenceInDays(festDate, today);
    return diff === 42; // Exactly 6 weeks prior
  });

  if (upcomingFestival) {
    console.log(`Activating Festive Mode for ${upcomingFestival.name}!`);
    try {
      // Activate festive mode for all users
      await db.query(`UPDATE users SET festive_mode = TRUE`);
      // Note: A real app might queue notifications here to alert users.
    } catch (err) {
      console.error('Error activating festive mode:', err);
    }
  }
}

/**
 * Checks if any festival was yesterday to deactivate festive mode.
 */
async function checkAndDeactivateFestiveMode() {
  const today = new Date();
  
  const pastFestival = FESTIVALS.find(festival => {
    const festDate = new Date(festival.date);
    const diff = differenceInDays(today, festDate);
    // Let's say we deactivate 3 days after the festival
    return diff === 3; 
  });

  if (pastFestival) {
    console.log(`Deactivating Festive Mode for ${pastFestival.name}`);
    try {
      await db.query(`UPDATE users SET festive_mode = FALSE`);
    } catch (err) {
      console.error('Error deactivating festive mode:', err);
    }
  }
}

// Schedule cron job to run daily at midnight MYT (Midnight MYT is 16:00 UTC)
// Since node-cron uses server time, we will assume the server is in MYT or 
// use timezone option if supported (node-cron supports it via options)
function initFestiveScheduler() {
  console.log('Initializing Festive Mode Scheduler...');
  cron.schedule('0 0 * * *', async () => {
    console.log('Running daily festive mode check...');
    await checkAndActivateFestiveMode();
    await checkAndDeactivateFestiveMode();
  }, {
    scheduled: true,
    timezone: "Asia/Kuala_Lumpur"
  });
}

module.exports = {
  initFestiveScheduler,
  FESTIVALS
};
