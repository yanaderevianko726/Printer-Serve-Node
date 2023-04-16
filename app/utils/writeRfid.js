var edge = require('edge-js');

// constructor
const WriteRFID = function (obj) {

};

WriteRFID.writeRfidCard = (pdfs, rfidModel, result) => {
    result(null, { retInt: 0, ...rfidModel });
};

module.exports = WriteRFID;

