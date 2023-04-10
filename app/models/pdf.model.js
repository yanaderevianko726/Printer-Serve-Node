const ThermalSdk = require("../utils/thermalsdk.js");

// constructor
const Pdfs = function (pdfs) {
  this.fullName = pdfs.fullName;
  this.pmKey = pdfs.pmKey;
  this.lockerNumber = pdfs.lockerNumber;
  this.bookType = pdfs.bookType;
  this.startedAt = pdfs.startedAt;
  this.endAt = pdfs.endAt;
};

Pdfs.init_controller = (str, result) => {
  result(null, { retVal: str });
};

Pdfs.init_port = (newPdf, result) => {
  ThermalSdk.setPrintPort(newPdf, { portName: "USBAuto", portRate: 115200 }, result);
};

module.exports = Pdfs;
