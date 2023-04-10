const initPrinterPort = require("./initport.js");

// constructor
const ThermalSdk = function (obj) {

};

ThermalSdk.setPrintPort = (newPdf, portData, result) => {
    initPrinterPort(newPdf, function (error, retVal) {
        if (error) throw error;
        console.log(retVal);
        result(null, { retInt: retVal, ...portData });
    });
};

module.exports = ThermalSdk;