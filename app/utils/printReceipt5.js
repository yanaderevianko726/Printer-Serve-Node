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

            SetAlignment(0);
            SetBold(1);
            SetSizetext(1, 1); 

            PrintString(new StringBuilder("Gallipoli Barracks"), 0);
            PrintFeedline(1);
            
            SetSizetext(0, 0); 
            PrintString(new StringBuilder("EMOS-5"), 0);
            PrintFeedline(1);

            SetBold(0);
            SetSizetext(0, 0);

            PrintString(new StringBuilder("PMKEY                 : 1234"), 0);
            PrintString(new StringBuilder("Rank                  : Pvt"), 0);
            PrintString(new StringBuilder("First Name            : Justin"), 0);
            PrintString(new StringBuilder("Last Name             : Dean"), 0);
            PrintString(new StringBuilder("Arrival Date          : Sat, 12 April 2023"), 0);
            PrintString(new StringBuilder("Departure Date        : Sat, 23 April 2023"), 0);
            PrintString(new StringBuilder("Building              : 1"), 0);
            PrintString(new StringBuilder("Room                  : 1"), 0);
            PrintString(new StringBuilder("Contact Number        : 0405 700 455"), 0);
            PrintString(new StringBuilder("Vehicle Registration  : EEEEEE"), 0);
            PrintString(new StringBuilder("Locker Number         : 18"), 0);
            PrintFeedline(1);
            PrintString(new StringBuilder("Use last 4 digits of PMKEY to access locker"), 0);
            PrintString(new StringBuilder("****"), 0);
            PrintFeedline(1);
            PrintString(new StringBuilder("By Accepting the issued key to the assigned "), 0);
            PrintString(new StringBuilder("room, the member acknowledges:"), 0);
            PrintFeedline(1);
            PrintString(new StringBuilder(" · Awareness of PACMAN Annex 7.4.A Living-in"), 0);            
            PrintString(new StringBuilder("   Accommodation"), 0);
            PrintString(new StringBuilder(" · To immediately report all defects / damaged"), 0);            
            PrintString(new StringBuilder("   to allow neccessary repair and rectification"), 0);
            PrintString(new StringBuilder(" · Occupant must leave the assigned room neat,"), 0);            
            PrintString(new StringBuilder("   tidy, and in the same condition as at the"), 0);            
            PrintString(new StringBuilder("   starting date"), 0);
            PrintString(new StringBuilder(" · Please check out prior to 10:00 am on day"), 0);            
            PrintString(new StringBuilder("   of departure"), 0);
            PrintFeedline(1);
            PrintString(new StringBuilder("Business Hours Key Return:"), 0);
            PrintFeedline(1);           
            PrintString(new StringBuilder("Accommodation Office (BLD F079) located at the"), 0);          
            PrintString(new StringBuilder("Monash Centre Ph: 07 3434 5446"), 0);
            PrintFeedline(1);
            PrintString(new StringBuilder("After Hours Key Return:"), 0);
            PrintFeedline(1);           
            PrintString(new StringBuilder("Accommodation After Hours Key Safe Lockers, "), 0);          
            PrintString(new StringBuilder("located opposite Downer accommodation office"), 0);        
            PrintString(new StringBuilder("within the Monash Centre (Bld F079) Duty Officer"), 0);    
            PrintString(new StringBuilder("Phone: 0438 710 603"), 0);
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

