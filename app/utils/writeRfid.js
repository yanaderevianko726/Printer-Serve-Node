const { SerialPort } = require('serialport')

var comPort1 = new SerialPort({
    path: 'COM1',
    baudRate: 9600,
    autoOpen: false,
});

comPort1.on('data', function (data) {
    console.log('--- Com1 received data:', data)
    currentRes = data;
    if (currentRes == Buffer.from([0x06, 0x30, 0x30])) {
        let cmd1 = Buffer.from([0x05, 0x30, 0x30]);
        comPort1.write(cmd1, function (err) {
            if (!err) {
                console.log("-- Com1 wrote with " + cmd1 + " ---");
            }
        });
    } else if (currentRes != Buffer.from([0x02, 0x30, 0x30, 0x00, 0x06, 0x53, 0x46, 0x30, 0x30, 0x30, 0x30, 0x03, 0x12])) {
        console.log('--- Card is in start position ---')
        let cmd = Buffer.from([0x02, 0x30, 0x30, 0x00, 0x02, 0x41, 0x50, 0x03, 0x12]);
        comPort1.write(cmd, function (err) {
            if (!err) {
                console.log("-- Com1 wrote with " + cmd + " ---");
            }
        });
    }
});

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
            let cmd = Buffer.from([0x02, 0x30, 0x30, 0x00, 0x02, 0x41, 0x50, 0x03, 0x12])
            comPort1.write(cmd, function (err) {
                if (err) {
                    console.log("-- Com1 write error ---");
                    result(null, { retInt: 1, ...rfidModel });
                } else {
                    console.log("-- Com1 wrote with " + cmd + " ---");
                    result(null, { retInt: 0, ...rfidModel });
                }
            });
        }
    })
};

WriteRFID.sendCardToReadPos = (rfidModel, result) => {
    let cmd = Buffer.from([0x02, 0x30, 0x30, 0x00, 0x03, 0x46, 0x43, 0x37, 0x03, 0x30])
    comPort1.write(cmd, function (err) {
        if (err) {
            result(null, { retInt: 1, ...rfidModel });
        } else {
            console.log("-- Com1 wrote with " + cmd + " ---");
            result(null, { retInt: 0, ...rfidModel });
        }
    });
};

WriteRFID.sendCardToTakePos = (rfidModel, result) => {
    let cmd = Buffer.from([0x02, 0x30, 0x30, 0x00, 0x03, 0x46, 0x43, 0x30, 0x03, 0x37])
    comPort1.write(cmd, function (err) {
        if (err) {
            result(null, { retInt: 1, ...rfidModel });
        } else {
            console.log("-- Com1 wrote with " + cmd + " ---");
            result(null, { retInt: 0, ...rfidModel });
        }
    });
};

WriteRFID.sendCardToOutPos = (rfidModel, result) => {
    let cmd = Buffer.from([0x02, 0x30, 0x30, 0x00, 0x03, 0x46, 0x43, 0x30, 0x03, 0x37])
    comPort1.write(cmd, function (err) {
        if (err) {
            result(null, { retInt: 1, ...rfidModel });
        } else {
            console.log("-- Com1 wrote with " + cmd + " ---");
            result(null, { retInt: 0, ...rfidModel });
        }
    });
};

module.exports = WriteRFID;

