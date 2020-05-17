const Joi = require('joi');
const mongoose = require('mongoose');


const Ventilator = mongoose.model('Ventilators', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, 
    minlength: 5,
    maxlength: 255
  },
  description: {
    type: String,
    required: true,
    trim: true
   },
  
  dailyRentalRate: {
    type: String,
    trim: true,
  required: false,
  }
}));

function validateVentilator(ventilator) {
  const schema = {
    title: Joi.string().min(5).max(190).required(),
    description: Joi.string().required(),
    dailyRentalRate: Joi.string()
    
      };

  return Joi.validate(ventilator, schema);
}

exports.Ventilator = Ventilator; 
exports.validate = validateVentilator;