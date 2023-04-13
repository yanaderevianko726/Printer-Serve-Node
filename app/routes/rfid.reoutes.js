module.exports = app => {
  var router = require("express").Router();
  const rfidController = require("../controllers/rfid.controller.js");

  router.get("/", rfidController.initController);
  router.post("/writteRfid", rfidController.writteRfid);

  app.use('/api/rfid', router);
};
