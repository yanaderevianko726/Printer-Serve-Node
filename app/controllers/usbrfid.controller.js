const UsbRfid = require("../utils/usbRfid.js");
const Pdfs = require("../models/pdf.model.js");
const RfidKey = require("../models/rfidKey.model.js");

exports.initController = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  res.send("Welcome to rfid reader module.");
};

exports.readInfo = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  UsbRfid.readInfo(req.body, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pdf."
      });
    else res.send(data);
  });
};

exports.writeUserPmKey = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const pdfs = new Pdfs(req.body); 
  UsbRfid.writePmKey(pdfs, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pdf."
      });
    else res.send(data);
  });
};

exports.decodeKey = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const rfidKey = new RfidKey(req.body); 
  UsbRfid.decodeKey(rfidKey, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pdf."
      });
    else res.send(data);
  });
};
