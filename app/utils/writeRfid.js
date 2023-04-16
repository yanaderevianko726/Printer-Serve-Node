var edge = require('edge-js');
var edgeWriteRfid = edge.func(function () {/*
    using System.Threading.Tasks;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.Drawing;
    using System.Linq;
    using System.Text;
    using System.Runtime.InteropServices;
    using System.IO.Ports;
    using System.Reflection;
    using System.Text.RegularExpressions;
    using System.Runtime.CompilerServices;
    using System.Diagnostics;
    using System.Threading;

    public class ClsPdf
    {
        public string fullName = "";
        public string pmKey = "";
        public string lockerNumber = "";
        public string bookType = "";
        public string startedAt = "";
        public string endAt = "";

        public void initWithDynamic(dynamic input){
            fullName = input.fullName;
            pmKey = input.pmKey;
            lockerNumber = input.lockerNumber;
            bookType = input.bookType;
            startedAt = input.startedAt;
            endAt = input.endAt;
        }
    }

    public class Startup
    {
        [DllImport("K720_Dll.dll", EntryPoint = "K720_CommOpenWithBaud", CharSet = CharSet.Ansi)]
        public static extern void K720_CommOpenWithBaud(char Port, int _data);

        string cboPort = "COM1";
        string cboBandrate = "9600";
        int m_iInit = -1;

        public async Task<object> Invoke(dynamic input)
        {
            ClsPdf clsPdf = new ClsPdf();
            clsPdf.initWithDynamic(input);

            K720_CommOpenWithBaud("9600, n, 8, 1", 9600);

            return 1;
        }
    }
*/});

// constructor
const WriteRFID = function (obj) {

};

WriteRFID.writeRfidCard = (pdfs, rfidModel, result) => {
    edgeWriteRfid(pdfs, function (error, retVal) {
        if (error) throw error;
        console.log(retVal);
        result(null, { retInt: retVal, ...rfidModel });
    });
};

module.exports = WriteRFID;

