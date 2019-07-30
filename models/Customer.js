// const mongoose = require("mongoose");

// const CustomerSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   phone: {
//     type: [String]
//   },
//   date: {
//     type: Date,
//     default: Date.now
//   },
//   location: {
//     type: Schema.Types.ObjectId,
//     ref: "address"
//   },
//   estimate: {
//     type: Schema.Types.ObjectId,
//     ref: "estimate"
//   },
//   service: {
//     type: Schema.Types.ObjectId,
//     ref: "job"
//   },
//   comments: [
//     {
//       user: {
//         type: Schema.Types.ObjectId,
//         ref: "users"
//       },
//       text: {
//         type: String,
//         required: true
//       },
//       name: {
//         type: String
//       },
//       avatar: {
//         type: String
//       },
//       date: {
//         type: Date,
//         default: Date.now
//       }
//     }
//   ]
// });

// module.exports = Customer = mongoose.model("user", CustomerSchema);
