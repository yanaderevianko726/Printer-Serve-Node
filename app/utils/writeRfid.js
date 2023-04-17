const { SerialPort } = require('serialport')
var comPort1 = new SerialPort({
    path: 'COM1',
    baudRate: 9600,
    autoOpen: false,
});
comPort1.on('data', function (data) {
    console.log('--- Com1 received data:', data)
});

let cmdCheckCard = Buffer.from([0x02, 0x30, 0x30, 0x00, 0x02, 0x41, 0x50, 0x03, 0x12]);
let cmdSendCardRead = Buffer.from([0x02, 0x30, 0x30, 0x00, 0x02, 0x41, 0x50, 0x03, 0x12]);
let cmdSendCardTake = Buffer.from([0x02, 0x30, 0x30, 0x00, 0x02, 0x41, 0x50, 0x03, 0x12]);
let cmdSendCardOut = Buffer.from([0x02, 0x30, 0x30, 0x00, 0x02, 0x41, 0x50, 0x03, 0x12]);

// constructor
const WriteRFID = function (obj) {

};

WriteRFID.openCom1Port = (rfidModel, result) => {
    comPort1.open(function (err) {
        if (err) {
            console.log("-- Com1 openfailed --");
            result(null, { retInt: 1, ...rfidModel });
        } else {
            console.log("-- Com1 opened with 9600 baudRate. --");
            comPort1.write(cmdCheckCard, function (err) {
                if (err) {
                    console.log("-- Com1 write error ---");
                    result(null, { retInt: 1, ...rfidModel });
                } else {
                    console.log("-- Com1 wrote with " + cmdCheckCard + " ---");
                    result(null, { retInt: 0, ...rfidModel });
                }
            });
        }
    })
};

WriteRFID.sendCardToReadPos = (rfidModel, result) => {
    comPort1.write(cmdSendCardRead, function (err) {
        if (err) {
            result(null, { retInt: 1, ...rfidModel });
        } else {
            console.log("-- Com1 wrote with " + cmdSendCardRead + " ---");
            result(null, { retInt: 0, ...rfidModel });
        }
    });
};

WriteRFID.sendCardToTakePos = (rfidModel, result) => {
    comPort1.write(cmdSendCardTake, function (err) {
        if (err) {
            result(null, { retInt: 1, ...rfidModel });
        } else {
            console.log("-- Com1 wrote with " + cmdSendCardTake + " ---");
            result(null, { retInt: 0, ...rfidModel });
        }
    });
};

WriteRFID.sendCardToOutPos = (rfidModel, result) => {
    comPort1.write(cmdSendCardOut, function (err) {
        if (err) {
            result(null, { retInt: 1, ...rfidModel });
        } else {
            console.log("-- Com1 wrote with " + cmdSendCardOut + " ---");
            result(null, { retInt: 0, ...rfidModel });
        }
    });
};

module.exports = WriteRFID;

