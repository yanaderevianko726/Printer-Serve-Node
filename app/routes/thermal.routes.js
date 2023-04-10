module.exports = app => {
  var router = require("express").Router();
  const thermalController = require("../controllers/thermal.controller.js");

  router.get("/", thermalController.initController);
  router.post("/initport", thermalController.initPort);
  router.post("/printReceipt3", thermalController.printReceipt3);
  router.post("/printReceipt5", thermalController.printReceipt5);

  app.use('/api/thermal', router);
};
