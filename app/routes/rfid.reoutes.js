module.exports = app => {
  var router = require("express").Router();
  const rfidController = require("../controllers/rfid.controller.js");

  router.get("/", rfidController.initController);
  router.post("/sendCardToReadPos", rfidController.sendCardToReadPos);
  router.post("/sendCardToTakePos", rfidController.sendCardToTakePos);
  router.post("/sendCardToOutPos", rfidController.sendCardToOutPos);

  app.use('/api/rfid', router);
};
