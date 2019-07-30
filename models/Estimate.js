const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EstimateSchema = new Schema({
  //Can Be Multiple Clients
  client: [
    {
      type: Schema.Types.ObjectId,
      ref: "clients"
    }
  ],
  location: [
    {
      type: Schema.Types.ObjectId,
      ref: "locations"
    }
  ],
  date: [
    {
      type: String
    }
  ],
  inventory: [
    {
      type: String
    }
  ],
  notes: {
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

module.exports = Post = mongoose.model("estimate", EstimateSchema);
