var ffi = require('ffi-napi');
var ndpi = new ffi.Library('K720_Dll.dll', {
    K720_CommOpen: ['void', ['char']],
});

// constructor
const WriteRFID = function (obj) {

};

WriteRFID.writeRfidCard = (pdfs, rfidModel, result) => {
    ndpi.K720_CommOpen();
    result(null, { retInt: 0, ...rfidModel });
    // WriteCrapVB('1234', function (error, retVal) {
    //     if (error) throw error;
    //     console.log(retVal);
    //     result(null, { retInt: retVal, ...rfidModel });
    // });
};

module.exports = WriteRFID;

