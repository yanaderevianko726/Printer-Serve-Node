const InitPort = require("../utils/initport.js");

// constructor
const ThermalPrinter = function (obj) {
  this.portName = obj.portName;
  this.portRate = obj.portRate;
};

ThermalPrinter.init_controller = (str, result) => {
  result(null, { retVal: str });
};

module.exports = ThermalPrinter;
