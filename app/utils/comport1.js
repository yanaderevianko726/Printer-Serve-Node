const { SerialPort } = require('serialport');

const comPort1 = new SerialPort({
    path: 'COM1',
    baudRate: 9600,
    autoOpen: false,
});

comPort1.on('data', function (data) {
    let currentRes = data.toString();
    if (currentRes == Buffer.from([0x06, 0x30, 0x30]).toString()) {
        console.log('--- Com1 received data: 06 30 30');

        let cmd1 = Buffer.from([0x05, 0x30, 0x30]);
        comPort1.write(cmd1, function (err) {
            console.log("-- Com1 wrote with : 05 30 30");
        });
    } else if (currentRes.includes("03")) {
        console.log('--- Com1 received data:', data.toString());

        let cmd = Buffer.from([0x02, 0x30, 0x30, 0x00, 0x02, 0x41, 0x50, 0x03, 0x12]);
        comPort1.write(cmd, function (err) {
            console.log("-- Com1 wrote with : 02 30 30 00 02 41 50 03 12");
        });
    }
});

const ComPort1 = function (obj) {

};

ComPort1.openComport = (result) => {
  comPort1.open(function (err1) {
      if (err1) {
          console.log("-- Com1 open failed --");
          result(null, { retInt: 1 });
      } else {
          console.log("-- Com1 opened with 9600 baudRate. --");
          let cmd = Buffer.from([0x02, 0x30, 0x30, 0x00, 0x02, 0x41, 0x50, 0x03, 0x12])
          comPort1.write(cmd, function (err) {
              console.log("-- Com1 wrote with: 02 30 30 00 02 41 50 03 12");
          result(null, { retInt: 0 });
          });
      }
  })
}

ComPort1.sendCardToReadPos = (result) => {
    let cmd = Buffer.from([0x02, 0x30, 0x30, 0x00, 0x03, 0x46, 0x43, 0x37, 0x03, 0x30])
    comPort1.write(cmd, function (err) {
        console.log("-- Com1 wrote with: 02 30 30 00 03 46 43 37 03 30");
        if (err) {
            result(null, { retInt: 1 });
        } else {
            result(null, { retInt: 0 });
        }
    });
};

ComPort1.sendCardToTakePos = (result) => {
    let cmd = Buffer.from([0x02, 0x30, 0x30, 0x00, 0x03, 0x46, 0x43, 0x34, 0x03, 0x33])
    comPort1.write(cmd, function (err) {
        console.log("-- Com1 wrote with: 02 30 30 00 03 46 43 34 03 33");
        if (err) {
            result(null, { retInt: 1 });
        } else {
            result(null, { retInt: 0 });
        }
    });
};

ComPort1.sendCardToOutPos = (result) => {
    let cmd = Buffer.from([0x02, 0x30, 0x30, 0x00, 0x03, 0x46, 0x43, 0x30, 0x03, 0x37])
    comPort1.write(cmd, function (err) {
        console.log("-- Com1 wrote with: 02 30 30 00 03 46 43 30 03 37");
        if (err) {
            result(null, { retInt: 1 });
        } else {
            result(null, { retInt: 0 });
        }
    });
};

module.exports = ComPort1;