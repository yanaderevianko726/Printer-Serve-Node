const UsbRfid = require("../utils/usbRfid.js");
const RFIDEncoder = require("../utils/rfidEncoder.js");
const RfidData = require("../models/rfid.data.model.js");
const Pdfs = require("../models/pdf.model.js");

exports.initController = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  res.send("Welcome to rfid reader module.");
};

exports.writeRfidData = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const rfidData = new RfidData(req.body);
  UsbRfid.writeInfo(rfidData, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pdf."
      });
    else res.send(data);
  });
};

exports.readRfidData = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  UsbRfid.readInfo((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pdf."
      });
    else res.send(data);
  });
};

exports.encodeKeyCard = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const pdfs = new Pdfs(req.body);
  RFIDEncoder.encodeKey(pdfs, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pdf."
      });
    else res.send(data);
  });
};
