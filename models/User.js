// models/User.js
const mongoose = require('mongoose');

const keySchema = new mongoose.Schema({
  publicKey: {
    type: String,
    required: true,
  },
  privateKey: {
    type: String,
    required: true,
  }
});

const Key = mongoose.model('Key', keySchema);
module.exports = Key;
