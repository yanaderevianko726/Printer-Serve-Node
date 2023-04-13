const Pdfs = require("../models/pdf.model.js");
const InitPort = require("../utils/initport.js");
const PrintReceipt3 = require("../utils/printReceipt3.js");
const PrintReceipt5 = require("../utils/printReceipt5.js");
const ThermalPrinter = require("../models/thermal.model.js");

var thermal = new ThermalPrinter({
  portName: "USBAuto",
  portRate: "115200"
});

exports.initController = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  res.send("Welcome to thermal printer");
};

// Create and Save a new Pdf
exports.initPort = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  InitPort.setPrintPort(thermal, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pdf."
      });
    else res.send(data);
  });
};

// Create and Save a new Pdf
exports.printReceipt3 = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Pdf
  const pdfs = new Pdfs(req.body);
  PrintReceipt3.printReceipt3(pdfs, thermal, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pdf."
      });
    else res.send(data);
  });
};

// Create and Save a new Pdf
exports.printReceipt5 = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Pdf
  const pdfs = new Pdfs(req.body);
  PrintReceipt5.printReceipt5(pdfs, thermal, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pdf."
      });
    else res.send(data);
  });
};
