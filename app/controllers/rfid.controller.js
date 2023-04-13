const Pdfs = require("../models/pdf.model.js");
const WriteRFID = require("../utils/writeRfid.js");
const RfidModel = require("../models/rfid.model.js");

var rfidModel = new RfidModel({
  portName: "COM1",
  portRate: "9600"
});

exports.initController = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  res.send("Welcome to RFID");
};

// Create and Save a new Pdf
exports.writteRfid = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Pdf
  const pdfs = new Pdfs(req.body);
  WriteRFID.writeRfidCard(pdfs, rfidModel, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pdf."
      });
    else res.send(data);
  });
};
