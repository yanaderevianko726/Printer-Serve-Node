const Pdfs = require("../models/pdf.model.js");

// Create and Save a new Pdf
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Pdf
  const pdfs = new Pdfs({
    fullName: req.body.fullName,
    pmKey: req.body.pmKey,
    lockerNumber: req.body.lockerNumber,
    bookType: req.body.bookType,
    startedAt: req.body.startedAt,
    endAt: req.body.endAt
  });

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
