const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  nameFirst: {
    type: String
  },
  nameMiddle: {
    type: String
  },
  nameLast: {
    type: String
  },
  nameSalutation: {
    type: String
  },
  nameSuffix: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateEdited: {
    type: Date,
    default: Date.now
  }
});

module.exports = Client = mongoose.model("client", ClientSchema);
