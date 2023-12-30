// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,'Name is required'],
  },
  email: {
    type: String,
    required: [true,'Email is required'],
  },
  password: {
    type: String,
    required: [true,'Password is required'],
  },
  isAdmin: {
    type: Boolean,
    default:false
  },
},{
    timestamps: true
  });

const User = mongoose.model('User', userSchema);

module.exports = User;
