const { SerialPort } = require('serialport')
var comPort1 = new SerialPort({
    path: 'COM1',
    baudRate: 9600,
    autoOpen: false,
});

// constructor
const WriteRFID = function (obj) {

};

WriteRFID.openComPort = (rfidModel, result) => {
    comPort1.open(function (err) {
        if (err) {
            console.log("-- Com1 openfailed --");
            result(null, { retInt: 1, ...rfidModel });
        } else {
            console.log("-- Com1 opened with 9600 baudRate. --");
            result(null, { retInt: 0, ...rfidModel });
        }
    })
};

WriteRFID.writeRfidCard = (pdfs, rfidModel, result) => {
    comPort1.write('023030000141500312', function (err) {
        if (err) {
            result(null, { retInt: 1, ...rfidModel });
        } else {
            console.log("-- Com1 wrote with 023030000141500312 --");
            result(null, { retInt: 0, ...rfidModel });
        }
    });
};

module.exports = WriteRFID;

