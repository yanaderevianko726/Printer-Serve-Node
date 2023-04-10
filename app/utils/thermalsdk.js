const InitPort = require("./initport.js");

// constructor
const ThermalSdk = function (obj) {

};

ThermalSdk.setPrintPort = (newPdf, portData, result) => {
    InitPort.setPrintPort(newPdf, portData, result);
};

module.exports = ThermalSdk;