var ffi = require('ffi-napi');

var library = new ffi.Library('Msprintsdk.dll', {
    SetPrintport: ["int", ["String", "int"]],
});

// constructor
const ThermalSdk = function (obj) {

};

ThermalSdk.setPrintPort = (newPdf, portData, result) => {
    console.log('__dirname: ' + __dirname);
    // var retInt = library.SetPrintport(portData.portName, portData.portRate);
    var retInt = 0;
    result(null, { retInt: retInt, ...portData });
};

module.exports = ThermalSdk;