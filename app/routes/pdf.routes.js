module.exports = app => {
  const pdfController = require("../controllers/pdf.controller.js");

  var router = require("express").Router();

  router.get("/", pdfController.init);
  router.post("/create", pdfController.create);

  app.use('/api/pdfs', router);
};
