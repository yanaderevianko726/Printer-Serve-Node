var SerialPort = require("serialport");
var port = "COM1";
var serialPort = new SerialPort(port, {
    baudRate: 9600
});

// constructor
const WriteRFID = function (obj) {

};

WriteRFID.writeRfidCard = (pdfs, rfidModel, result) => {
    serialPort.on("open", function () {
        console.log("-- Com1 opened with 9600 baudRate--");
        serialPort.write('023030000141500312', function (err) {
            if (err) {
                result(null, { retInt: 1, ...rfidModel });
            }
        });
        serialPort.on("data", function (data) {
            console.log("Data received: " + data);
            result(null, { retInt: data, ...rfidModel });
        });
    });
};

module.exports = WriteRFID;

