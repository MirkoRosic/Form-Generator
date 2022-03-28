const mongoose = require('mongoose');

const formsSchema = new mongoose.Schema({
  label_id: {
    type: String,
    required: [true, 'An input field must have a label']
  },
  type: {
    type: String
  },
  name: {
    type: String,
    required: true
  }
});

const Form = mongoose.model('Form', formsSchema);

module.exports = Form;
