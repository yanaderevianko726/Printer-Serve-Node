const { SerialPort } = require('serialport')

var comPort1 = new SerialPort({
    path: 'COM1',
    baudRate: 9600,
    autoOpen: false,
});

var res2 = '';

comPort1.on('data', function (data) {
    let currentRes = data.toString();
    if (currentRes == Buffer.from([0x06, 0x30, 0x30]).toString()) {
        console.log('--- Com1 received data: 06 30 30');

        res2 = '';
        let cmd1 = Buffer.from([0x05, 0x30, 0x30]);
        comPort1.write(cmd1, function (err) {
            console.log("-- Com1 wrote with : 05 30 30");
        });
    } else if (currentRes.includes("03")) {
        console.log('--- Com1 received data:', data.toString());

        res2 = '';
        let cmd = Buffer.from([0x02, 0x30, 0x30, 0x00, 0x02, 0x41, 0x50, 0x03, 0x12]);
        comPort1.write(cmd, function (err) {
            console.log("-- Com1 wrote with : 02 30 30 00 02 41 50 03 12");
        });
    } else {
        res2 = res2 + ' ' + currentRes;
        console.log("-- res2 : ", res2);
    }
});

// constructor
const WriteRFID = function (obj) {

};

WriteRFID.openCom1Port = (rfidModel, result) => {
    res2 = '';  
    comPort1.open(function (err) {
        if (err) {
            console.log("-- Com1 open failed --");
            result(null, { retInt: 1, ...rfidModel });
        } else {
            console.log("-- Com1 opened with 9600 baudRate. --");
            let cmd = Buffer.from([0x02, 0x30, 0x30, 0x00, 0x02, 0x41, 0x50, 0x03, 0x12])
            comPort1.write(cmd, function (err) {
                console.log("-- Com1 wrote with: 02 30 30 00 02 41 50 03 12");
                if (err) {
                    result(null, { retInt: 1, ...rfidModel });
                } else {
                    result(null, { retInt: 0, ...rfidModel });
                }
            });
        }
    })
};

WriteRFID.sendCardToReadPos = (rfidModel, result) => {
    res2 = '';
    let cmd = Buffer.from([0x02, 0x30, 0x30, 0x00, 0x03, 0x46, 0x43, 0x37, 0x03, 0x30])
    comPort1.write(cmd, function (err) {
        console.log("-- Com1 wrote with: 02 30 30 00 03 46 43 37 03 30");
        if (err) {
            result(null, { retInt: 1, ...rfidModel });
        } else {
            result(null, { retInt: 0, ...rfidModel });
        }
    });
};

WriteRFID.sendCardToTakePos = (rfidModel, result) => {
    res2 = '';
    let cmd = Buffer.from([0x02, 0x30, 0x30, 0x00, 0x03, 0x46, 0x43, 0x34, 0x03, 0x33])
    comPort1.write(cmd, function (err) {
        console.log("-- Com1 wrote with: 02 30 30 00 03 46 43 34 03 33");
        if (err) {
            result(null, { retInt: 1, ...rfidModel });
        } else {
            result(null, { retInt: 0, ...rfidModel });
        }
    });
};

WriteRFID.sendCardToOutPos = (rfidModel, result) => {
    res2 = '';
    let cmd = Buffer.from([0x02, 0x30, 0x30, 0x00, 0x03, 0x46, 0x43, 0x30, 0x03, 0x37])
    comPort1.write(cmd, function (err) {
        console.log("-- Com1 wrote with: 02 30 30 00 03 46 43 30 03 37");
        if (err) {
            result(null, { retInt: 1, ...rfidModel });
        } else {
            result(null, { retInt: 0, ...rfidModel });
        }
    });
};

module.exports = WriteRFID;

