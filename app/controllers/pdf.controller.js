const Pdfs = require("../models/pdf.model.js");

exports.init = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Pdfs.init('welcome', (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "There are some error in connection."
      });
    else res.send(data);
  });
};

// Create and Save a new Pdf
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Pdf
  const pdfs = new Pdfs(req.body);

  // Save Pdf in the pc downloads folder
  Pdfs.create(pdfs, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pdf."
      });
    else res.send(data);
  });
};
