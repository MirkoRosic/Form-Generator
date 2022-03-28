const express = require('express');
const cors = require('cors');

const formsController = require('../controllers/formsController');

const corsOptions = {
  origin: false,
  optionsSuccessStatus: 200
};

const router = express.Router();

router
  .route('/')
  .get(cors(corsOptions), formsController.getForms)
  .post(formsController.createFormData);

module.exports = router;
