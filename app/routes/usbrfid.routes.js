module.exports = app => {
  var router = require("express").Router();
  const usbRfidController = require("../controllers/usbrfid.controller.js");

  router.get("/", usbRfidController.initController);
  router.post("/writePmKey", usbRfidController.writeRfidData);
  router.post("/readInfo", usbRfidController.readRfidData);
  router.post("/encodeKey", usbRfidController.encodeKeyCard);

  app.use('/api/usbRfid', router);
};
