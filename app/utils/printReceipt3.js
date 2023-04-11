var edge = require('edge-js');
var edgePrintReceipt3 = edge.func(function () {/*
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
        [DllImport("Msprintsdk.dll", EntryPoint = "SetCommandmode", CharSet = CharSet.Ansi)]
        public static extern int SetCommandmode(int iMode);

        [DllImport("Msprintsdk.dll", EntryPoint = "SetSizetext", CharSet = CharSet.Ansi)]
        public static extern int SetSizetext(int iHeight,int iWidth);

        [DllImport("Msprintsdk.dll", EntryPoint = "PrintString", CharSet = CharSet.Ansi)]
        public static extern int PrintString(StringBuilder strData, int iImme);

        [DllImport("Msprintsdk.dll", EntryPoint = "SetAlignment", CharSet = CharSet.Ansi)]
        public static extern int SetAlignment(int iAlignment);

        [DllImport("Msprintsdk.dll", EntryPoint = "SetBold", CharSet = CharSet.Ansi)]
        public static extern int SetBold(int iBold);

        [DllImport("Msprintsdk.dll", EntryPoint = "PrintFeedline", CharSet = CharSet.Ansi)]
        public static extern int PrintFeedline(int iLine);

        [DllImport("Msprintsdk.dll", EntryPoint = "SetLeftmargin", CharSet = CharSet.Ansi)]
        public static extern int SetLeftmargin(int iLmargin);

        [DllImport("Msprintsdk.dll", EntryPoint = "PrintDiskbmpfile", CharSet = CharSet.Ansi)]
        public static extern int PrintDiskbmpfile(StringBuilder strData);

        [DllImport("Msprintsdk.dll", EntryPoint = "SetClean", CharSet = CharSet.Ansi)]
        public static extern int SetClean();

        [DllImport("Msprintsdk.dll", EntryPoint = "PrintCutpaper", CharSet = CharSet.Ansi)]
        public static extern int PrintCutpaper(int iMode);

        public async Task<object> Invoke(dynamic input)
        {
            ClsPdf clsPdf = new ClsPdf();
            clsPdf.initWithDynamic(input);

            StringBuilder sbData = new StringBuilder("");
            SetCommandmode(3);

            SetAlignment(1);
            SetBold(1);
            sbData = new StringBuilder("** Downer Defence **");
            PrintString(sbData, 0);

            SetAlignment(1);
            SetBold(1);
            sbData = new StringBuilder("** Gallipoli Barracks **");
            PrintString(sbData, 0);

            SetAlignment(0);
            SetBold(0);
            PrintFeedline(1);

            SetAlignment(1);
            SetBold(1);
            sbData = new StringBuilder("** EMOS-3 **");
            PrintString(sbData, 0);
            PrintFeedline(1);

            SetLeftmargin(24);
            sbData = new StringBuilder("C:\\PrinterNodeServe\\downer_logo.bmp");
            PrintDiskbmpfile(sbData);
            SetClean();

            Thread.Sleep(1000);

            SetLeftmargin(0);
            PrintFeedline(1);

            sbData = new StringBuilder("Full Name      : Justin Dean");
            PrintString(sbData, 0);

            sbData = new StringBuilder("PM Key         : 1234");
            PrintString(sbData, 0);

            sbData = new StringBuilder("Locker Number  : 18");
            PrintString(sbData, 0);
            PrintFeedline(1);

            sbData = new StringBuilder(DateTime.Now.ToLocalTime().ToString());
            PrintString(sbData, 0);

            PrintFeedline(2);
            PrintCutpaper(0);
            SetClean();
            
            return 1;
        }
    }
*/});

// constructor
const PrintReceipt3 = function (obj) {

};

PrintReceipt3.printReceipt3 = (pdfs, thermal, result) => {
    edgePrintReceipt3(pdfs, function (error, retVal) {
        if (error) throw error;
        console.log(retVal);
        result(null, { retInt: retVal, ...thermal });
    });
};

module.exports = PrintReceipt3;

