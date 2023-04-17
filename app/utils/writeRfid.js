var SerialPort = require("serialport").SerialPort
var comPort1 = new SerialPort('COM1', {
    baudRate: 9600
});

// constructor
const WriteRFID = function (obj) {

};

WriteRFID.openComPort = (pdfs, rfidModel, result) => {
    comPort1.on("open", function () {
        console.log("-- Com1 opened with 9600 baudRate--");
    });
};

WriteRFID.writeRfidCard = (pdfs, rfidModel, result) => {
    comPort1.write('023030000141500312', function (err) {
        if (err) {
            result(null, { retInt: 1, ...rfidModel });
        }
    });
    comPort1.on("data", function (data) {
        console.log("Data received: " + data);
        result(null, { retInt: data, ...rfidModel });
    });
};

module.exports = WriteRFID;

