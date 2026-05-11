const Queue = require('bull');
require('dotenv').config();

// Create a Bull queue for notifications
const notificationQueue = new Queue('notifications', process.env.REDIS_URL || 'redis://localhost:6379');

// Processor for the queue
notificationQueue.process(async (job) => {
  const { userId, title, body, data } = job.data;
  
  console.log(`[Notification Dispatcher] Processing job ${job.id} for User ${userId}`);
  
  try {
    // In a real app, you would use Firebase Admin SDK or APNs here.
    // Example:
    // await admin.messaging().send({
    //   token: userDeviceToken,
    //   notification: { title, body },
    //   data
    // });
    
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log(`[Notification Dispatcher] Successfully sent to User ${userId}: ${title}`);
    return { success: true };
  } catch (err) {
    console.error(`[Notification Dispatcher] Failed to send to User ${userId}`, err);
    throw err; // Bull will retry based on config
  }
});

// Event listeners for queue monitoring
notificationQueue.on('completed', (job, result) => {
  console.log(`Job ${job.id} completed! Result: ${JSON.stringify(result)}`);
});

notificationQueue.on('failed', (job, err) => {
  console.log(`Job ${job.id} failed! Error: ${err.message}`);
});

/**
 * Dispatches a push notification by adding it to the queue.
 * @param {number} userId 
 * @param {string} title 
 * @param {string} body 
 * @param {Object} data 
 * @param {Object} options Bull job options (e.g., delay)
 */
async function dispatchNotification(userId, title, body, data = {}, options = {}) {
  await notificationQueue.add(
    { userId, title, body, data },
    {
      attempts: 3,
      backoff: 5000,
      ...options
    }
  );
}

module.exports = {
  notificationQueue,
  dispatchNotification
};
