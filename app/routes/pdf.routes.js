module.exports = app => {
  const pdfController = require("../controllers/pdf.controller.js");

  var router = require("express").Router();

  router.get("/", pdfController.initController);
  router.post("/initport", pdfController.initPort);

  app.use('/api/pdfs', router);
};
