module.exports = app => {
  var router = require("express").Router();
  const usbRfidController = require("../controllers/usbrfid.controller.js");

  router.get("/", usbRfidController.initController);
  router.post("/initport", usbRfidController.writeUserPmKey);

  app.use('/api/usbRfid', router);
};
