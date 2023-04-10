const Pdfs = require("../models/pdf.model.js");
const InitPort = require("../utils/initport.js");
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
  res.send("Welcome");
};

// Create and Save a new Pdf
exports.initPort = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Pdf
  const pdfs = new Pdfs(req.body);
  InitPort.setPrintPort(pdfs, thermal, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pdf."
      });
    else res.send(data);
  });
};
