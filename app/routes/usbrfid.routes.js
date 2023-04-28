module.exports = app => {
  var router = require("express").Router();
  const usbRfidController = require("../controllers/usbrfid.controller.js");

  router.get("/", usbRfidController.initController);
  router.post("/readInfo", usbRfidController.readInfo);
  router.post("/writePmKey", usbRfidController.writeUserPmKey);
  router.post("/decodeKey", usbRfidController.decodeKey);

  app.use('/api/usbRfid', router);
};
