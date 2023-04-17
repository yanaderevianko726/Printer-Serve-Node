const WriteRFID = require("../utils/writeRfid.js");
const RfidModel = require("../models/rfid.model.js");

var rfidModel = new RfidModel({
  portName: "COM1",
  portRate: "9600"
});

exports.initController = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  res.send("Welcome to RFID");
};

exports.openComPort = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  WriteRFID.openCom1Port(rfidModel, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pdf."
      });
    else res.send(data);
  });
};

exports.sendCardToReadPos = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  WriteRFID.sendCardToReadPos(rfidModel, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pdf."
      });
    else res.send(data);
  });
};

exports.sendCardToTakePos = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  WriteRFID.sendCardToTakePos(rfidModel, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pdf."
      });
    else res.send(data);
  });
};

exports.sendCardToOutPos = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  WriteRFID.sendCardToOutPos(rfidModel, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pdf."
      });
    else res.send(data);
  });
};
