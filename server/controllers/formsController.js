const Form = require('../models/formModel');
const Data = require('../models/dataModel');

const getForms = async (req, res) => {
  try {
    const formData = await Form.find({});
    res.status(200).json({
      status: 'success',
      data: formData
    });
  } catch (err) {
    console.log(err, "couldn't get data");
  }
};

const createFormData = async (req, res) => {
  try {
    // eslint-disable-next-line no-restricted-syntax
    // for (const [key] of Object.entries(req.body)) {
    //   if (req.body[key] === '') {
    //     delete req.body[key];
    //   }
    // }
    const newData = await Data.create(req.body);

    res.status(201).json({
      status: 'success',
      data: newData
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getForms, createFormData };
