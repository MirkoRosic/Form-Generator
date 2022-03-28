const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({ name: String }, { strict: false });

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
