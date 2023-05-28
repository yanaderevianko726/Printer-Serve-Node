const express = require("express");
const cors = require("cors");
const { SerialPort } = require('serialport')

const app = express();
const PORT = process.env.PORT || 8081;

module.exports const comPort1 = new SerialPort({
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

app.use(cors({
  origin: "http://localhost:8001"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ message: "Welcome to our application." });
});

require("./app/routes/thermal.routes.js")(app);
require("./app/routes/rfid.reoutes.js")(app);
require("./app/routes/usbrfid.routes.js")(app);
require("./app/routes/user.routes.js")(app);

app.listen(PORT, () => {
  comPort1.open(function (err1) {
      if (err1) {
          console.log("-- Com1 open failed --");
      } else {
          console.log("-- Com1 opened with 9600 baudRate. --");
          let cmd = Buffer.from([0x02, 0x30, 0x30, 0x00, 0x02, 0x41, 0x50, 0x03, 0x12])
          comPort1.write(cmd, function (err) {
              console.log("-- Com1 wrote with: 02 30 30 00 02 41 50 03 12");
          });
      }
  })
  console.log(`Server is running on port ${PORT}.`);
});
