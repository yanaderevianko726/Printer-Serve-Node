module.exports = app => {
  var router = require("express").Router();
  const thermalController = require("../controllers/thermal.controller.js");

  router.get("/", thermalController.initController);
  router.post("/initport", thermalController.initPort);

  app.use('/api/thermal', router);
};
