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
        public string firstName = "";
        public string lastName = "";
        public string pmKey = "";
        public string rank = "";
        public string roomKey = "";
        public string roomNum = "";
        public string mobile = "";
        public string lockerNumber = "";
        public string bookType = "";
        public string startedAt = "";
        public string endAt = "";

        public void initWithDynamic(dynamic input){
            firstName = input.firstName;
            lastName = input.lastName;
            pmKey = input.pmKey;
            rank = input.rank;
            roomKey = input.roomKey;
            roomNum = input.roomNum;
            mobile = input.mobile;
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

        [DllImport("Msprintsdk.dll", EntryPoint = "PrintDiskimgfile", CharSet = CharSet.Ansi)]
        public static extern int PrintDiskimgfile(StringBuilder strData);

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
               
            PrintString(new StringBuilder("   "), 0);    
            PrintString(new StringBuilder("   "), 0);  

            PrintDiskimgfile(new StringBuilder("C:\\downer_logo.bmp"));
            PrintFeedline(1);

            SetAlignment(0);
            SetBold(1);

            PrintString(new StringBuilder("Gallipoli Barracks"), 0);
            PrintFeedline(1);
            
            PrintString(new StringBuilder("EMOS-5"), 0);
            PrintFeedline(1);

            SetBold(0);

            StringBuilder sbPrint = new StringBuilder("PMKEY                 : ");
            sbPrint.Append(clsPdf.pmKey);
            PrintString(sbPrint, 0);

            sbPrint = new StringBuilder("Rank                  : ");
            sbPrint.Append(clsPdf.rank);
            PrintString(sbPrint, 0);

            sbPrint = new StringBuilder("First Name            : ");
            sbPrint.Append(clsPdf.firstName);
            PrintString(sbPrint, 0);

            sbPrint = new StringBuilder("Last Name             : ");
            sbPrint.Append(clsPdf.lastName);
            PrintString(sbPrint, 0);

            sbPrint = new StringBuilder("Arrival Date          : ");
            sbPrint.Append(clsPdf.startedAt);
            PrintString(sbPrint, 0);

            sbPrint = new StringBuilder("Departure Date        : ");
            sbPrint.Append(clsPdf.endAt);
            PrintString(sbPrint, 0);

            sbPrint = new StringBuilder("Building              : ");
            sbPrint.Append(clsPdf.roomKey);
            PrintString(sbPrint, 0);

            sbPrint = new StringBuilder("Room                  : ");
            sbPrint.Append(clsPdf.roomNum);
            PrintString(sbPrint, 0);

            sbPrint = new StringBuilder("Contact Number        : ");
            sbPrint.Append(clsPdf.mobile);
            PrintString(sbPrint, 0);

            sbPrint = new StringBuilder("Vehicle Registration  : EEEEEE");
            sbPrint.Append(clsPdf.mobile);
            PrintString(sbPrint, 0);

            sbPrint = new StringBuilder("Locker Number         : ");
            sbPrint.Append(clsPdf.lockerNumber);
            PrintString(sbPrint, 0);
            
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
            PrintString(new StringBuilder(" · Please check out prior to 10:00 am on day"), 0);            
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
            PrintFeedline(5);           
            
            SetClean();

            return 1;
        }
    }
*/});

// constructor
const PrintReceipt5 = function (obj) {

};

PrintReceipt5.printReceipt5 = (pdfs, thermalModel, result) => {
    edgePrintReceipt5(pdfs, function (error, retVal) {
        if (error) throw error;
        console.log(retVal);
        result(null, { retInt: retVal, ...thermalModel });
    });
};

module.exports = PrintReceipt5;

