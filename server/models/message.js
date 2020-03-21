const mongoose = require('mongoose');
var Schema = mongoose.Schema

const schema = new Schema({
  id: { type: String, required: true },
  subject: { type: String },
  msgText: { type: String, required: true },
  sender: { type: String }
  // sender:  { type: Schema.Types.ObjectId, ref: 'Contact' }
});

module.exports = mongoose.model('Message', schema);
