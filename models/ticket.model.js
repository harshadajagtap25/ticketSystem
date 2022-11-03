const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
  Catergory: String,
  Title: String,
  Message: String,
},{timestamps: true} );

const ticketModel = mongoose.model("ticket", ticketSchema);
module.exports = {
  ticketModel,
};
