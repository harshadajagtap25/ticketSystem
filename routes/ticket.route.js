const { ticketModel } = require("../models/ticket.model");

const { Router } = require("express");
const ticketController = Router();

ticketController.get("/", async (req, res) => {
  const ticktes = await ticketModel.find({ userId: req.body.userId });
  res.send({ data: ticktes });
});

ticketController.post("/create", async (req, res) => {
  const { Catergory, Title, Message } = req.body;
//   console.log(req.body);

  const tickets = new ticketModel({ Catergory, Title, Message });
  try {
    await tickets.save();
    res.send({ msg: "Created succesfully" });
  } catch (e) {
    console.log("Something went wrong");
  }
});

module.exports = { ticketController };
