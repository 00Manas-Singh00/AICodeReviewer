const express = require('express');
const router = express.Router();
const aiService = require('../services/ai.service');
const aiController = require('../controllers/ai.controller');

router.post('/generateReview', aiController.getReview);

module.exports = router;