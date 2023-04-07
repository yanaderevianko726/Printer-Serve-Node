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

Pdfs.init = (str, result) => {
  result(null, { retVal: str });
};

Pdfs.create = (newPdf, result) => {
  ThermalSdk.setPrintPort(newPdf, { portName: "USB001", portRate: 9600 }, result);
};

module.exports = Pdfs;
