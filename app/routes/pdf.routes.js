module.exports = app => {
  const pdfController = require("../controllers/pdf.controller.js");

  var router = require("express").Router();

  // Create a new Pdf
  router.post("/", pdfController.create);

  app.use('/api/pdfs', router);
};
