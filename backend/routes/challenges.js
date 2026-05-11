const express = require('express');
const router = express.Router();
const { mockAuth } = require('../middleware/mockAuth');
const {
  generateUserChallenges,
  completeChallenge,
  failChallenge
} = require('../controllers/challengeController');

router.use(mockAuth);

router.post('/generate', generateUserChallenges);
router.patch('/:id/complete', completeChallenge);
router.patch('/:id/fail', failChallenge);

module.exports = router;
