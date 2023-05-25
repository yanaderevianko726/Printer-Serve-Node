module.exports = app => {
  var router = require("express").Router();
  const usbRfidController = require("../controllers/usbrfid.controller.js");

  router.get("/", usbRfidController.initController);
  router.post("/readCardInfo", usbRfidController.readCardInfo);
  router.post("/writteCardInfo", usbRfidController.writteCardInfo);
  router.post("/encodeKeyCard", usbRfidController.encodeKeyCard);

  app.use('/api/usbRfid', router);
};
