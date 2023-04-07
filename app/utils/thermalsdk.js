var edge = require('edge-js');

var printSdk = edge.func(function () {/*
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
    using System.Diagnostics; 

    public class ClsPdf
    {
        public string  fullName = "";
        public string  pmKey = "";
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
        [DllImport("Msprintsdk.dll", EntryPoint = "SetPrintport", CharSet = CharSet.Ansi)]
        public static extern int SetPrintport(StringBuilder strPort, int iBaudrate);

        public async Task<object> Invoke(dynamic input)
        {
            ClsPdf clsPdf = new ClsPdf();
            clsPdf.initWithDynamic(input);
            
            return clsPdf.bookType;
        }
    }
*/});

// constructor
const ThermalSdk = function (obj) {

};

ThermalSdk.setPrintPort = (newPdf, portData, result) => {
    printSdk(newPdf, function (error, result) {
        if (error) throw error;
        console.log(result);
    });
    var retInt = 0;
    result(null, { retInt: retInt, ...portData });
};

module.exports = ThermalSdk;