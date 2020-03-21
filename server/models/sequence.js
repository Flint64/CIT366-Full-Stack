
const mongoose = require('mongoose');
var Schema = mongoose.Schema

const schema = new Schema({
  maxDocumentId: { type: Number, required: true },
  maxMessageId:  { type: Number, required: true },
  maxContactId:  { type: Number, required: true }
});

module.exports = mongoose.model('Sequence', schema);

//FIXME: Is this file right?


//TODO: Figure out why nodemon server.js fails (invalid value for schema path 
//      from the mongoose schema.js file


//TODO: Figure out the saveContact mapping function? Where does that go?


//TODO: After resolving errors and getting node/mongo funcioning, link up with
//      the angular frontend and this should be good to go.