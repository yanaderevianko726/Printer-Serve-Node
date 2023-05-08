module.exports = app => {
  var router = require("express").Router();
  const usbRfidController = require("../controllers/usbrfid.controller.js");

  router.get("/", usbRfidController.initController);
  router.post("/encodeKey", usbRfidController.encodeKeyCard);
  router.post("/writePmKey", usbRfidController.writeUserPmKey);
  router.post("/readInfo", usbRfidController.readInfo);

  app.use('/api/usbRfid', router);
};
