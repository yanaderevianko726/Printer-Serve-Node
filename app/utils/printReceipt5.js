var edge = require('edge-js');
var edgePrintReceipt5 = edge.func(function () {/*
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
        [DllImport("Msprintsdk.dll", EntryPoint = "SetInit", CharSet = CharSet.Ansi)]
        public static extern int SetInit();

        [DllImport("Msprintsdk.dll", EntryPoint = "SetCommandmode", CharSet = CharSet.Ansi)]
        public static extern int SetCommandmode(int iMode);

        [DllImport("Msprintsdk.dll", EntryPoint = "SetPrintport", CharSet = CharSet.Ansi)]
        public static extern int SetPrintport(StringBuilder strPort, int iBaudrate);

        [DllImport("Msprintsdk.dll", EntryPoint = "SetUsbportauto", CharSet = CharSet.Ansi)]
        public static extern int SetUsbportauto();

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
        
        [DllImport("Msprintsdk.dll", EntryPoint = "SetLinespace", CharSet = CharSet.Ansi)]
        public static extern int SetLinespace(int iLinespace);

        string cboPort = "USBAuto";
        string cboBandrate = "115200";
        int m_iInit = -1, r = -1, s = -1, b = -1;

        public async Task<object> Invoke(dynamic input)
        {
            ClsPdf clsPdf = new ClsPdf();
            clsPdf.initWithDynamic(input);

            StringBuilder sPort = new StringBuilder(cboPort, cboPort.Length);
            int iBaudrate = int.Parse(cboBandrate);
            r = SetPrintport(sPort, iBaudrate);

            s = SetUsbportauto();
            m_iInit = SetInit();

            SetClean();
            SetCommandmode(3);
            PrintFeedline(2);

            SetSizetext(1, 1);
            SetAlignment(0);
            SetBold(1);

            PrintString(new StringBuilder("Downer Defence"), 0);
            PrintString(new StringBuilder("Gallipoli Barracks"), 0);
            PrintFeedline(1);

            SetSizetext(1, 1); 
            PrintString(new StringBuilder("EMOS-5"), 0);
            PrintFeedline(1);

            SetBold(0);
            SetSizetext(0, 0);

            PrintString(new StringBuilder("Full Name      : Justin Dean"), 0);
            PrintString(new StringBuilder("PM Key         : 1234"), 0);
            PrintString(new StringBuilder("Locker Number  : 18"), 0);
            PrintFeedline(2);

            return 1;
        }
    }
*/});

// constructor
const PrintReceipt5 = function (obj) {

};

PrintReceipt5.printReceipt5 = (pdfs, thermal, result) => {
    edgePrintReceipt5(pdfs, function (error, retVal) {
        if (error) throw error;
        console.log(retVal);
        result(null, { retInt: retVal, ...thermal });
    });
};

module.exports = PrintReceipt5;

