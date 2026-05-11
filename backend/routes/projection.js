const express = require('express');
const router = express.Router();
const { mockAuth } = require('../middleware/mockAuth');
const {
  getProjection,
  updateImprovedBaseline
} = require('../controllers/projectionController');

router.use(mockAuth);

router.get('/', getProjection);
router.post('/update-improved', updateImprovedBaseline);

module.exports = router;
