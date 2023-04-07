const Pdfs = require("../models/pdf.model.js");

exports.initController = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Pdfs.init_controller('welcome', (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "There are some error in connection."
      });
    else res.send(data);
  });
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

  // Save Pdf in the pc downloads folder
  Pdfs.init_port(pdfs, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pdf."
      });
    else res.send(data);
  });
};
