var edge = require('edge-js');

var edgeWritePmKey = edge.func(function () {/*
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
    using System.Runtime.CompilerServices;
    using System.Diagnostics;
    using System.Threading;
    using System.Text.RegularExpressions;

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
        public string vehicle = "";
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
            vehicle = input.vehicle;
            startedAt = input.startedAt;
            endAt = input.endAt;
        }
    }

    public class Startup
    {
        [DllImport("function.dll")]
        public static extern int UL_HLWrite(byte mode, byte blk_add, [In]byte[] snr, [In]byte[] buffer);

        [DllImport("tcppmsif.dll", EntryPoint = "PMSifRegister", CharSet = CharSet.Ansi)]
        public static extern int PMSifRegister(string szLicense, string szAppl);

        [DllImport("tcppmsif.dll", EntryPoint = "PMSifReturnKcdLcl", CharSet = CharSet.Ansi)]
        public static extern string PMSifReturnKcdLcl(byte ff, string Dta, bool Dbg, string szOpId, string szOpFirst, string szOpLast);

        [DllImport("tcppmsif.dll", EntryPoint = "PMSifEncodeKcdLcl", CharSet = CharSet.Ansi)]
        public static extern void PMSifEncodeKcdLcl(byte ff, string Dta, bool Dbg, string szOpId, string szOpFirst, string szOpLast);

        private string formatStr(string str, int num_blk)
        {            
            string tmp=Regex.Replace(str,"[^a-fA-F0-9]","");
            if (num_blk == -1) return tmp;
            if (num_blk < -1) {
                if (tmp.Length != -16 / num_blk * 2) return null;
                else return tmp;
            }
            if (tmp.Length != 16*num_blk*2) return null;
            else return tmp;
        }

        private void convertStr(byte[] after, string before, int length)
        {
            for (int i = 0; i < length; i++) {
                after[i] = Convert.ToByte(before.Substring(2 * i, 2), 16);
            }
        }

        public async Task<object> Invoke(dynamic input)
        {   
            ClsPdf clsPdf = new ClsPdf();
            clsPdf.initWithDynamic(input);

            string writteData = "G";    
            int ascCode = 71;  // G
            string asciiStr = ascCode.ToString("X"); 

            ascCode = 30; // Record Separator
            string recordSp = ascCode.ToString("X");

            // string rNum = Regex.Replace(clsPdf.roomNum,"[^0-9]","");
            string rNum = clsPdf.roomNum;

            writteData += "*R" + rNum;
            ascCode = 82;
            asciiStr += recordSp + ascCode.ToString("X"); // *R
            byte[] rBytes = Encoding.ASCII.GetBytes(rNum);
            foreach (byte byt in rBytes)
            {
                asciiStr += byt.ToString("X");
            }

            writteData += "*TSINGLE";
            ascCode = 84;
            asciiStr += recordSp + ascCode.ToString("X"); // *T
            byte[] tBytes = Encoding.ASCII.GetBytes("SINGLE");
            foreach (byte byt in tBytes)
            {
                asciiStr += byt.ToString("X");
            }

            writteData += "*F" + clsPdf.firstName;
            ascCode = 70;
            asciiStr += recordSp + ascCode.ToString("X"); // *F
            byte[] fBytes = Encoding.ASCII.GetBytes(clsPdf.firstName);
            foreach (byte byt in fBytes)
            {
                asciiStr += byt.ToString("X");
            }

            writteData += "*N" + clsPdf.lastName;
            ascCode = 78;
            asciiStr += recordSp + ascCode.ToString("X"); // *N
            byte[] lBytes = Encoding.ASCII.GetBytes(clsPdf.lastName);
            foreach (byte byt in lBytes)
            {
                asciiStr += byt.ToString("X");
            }

            writteData += "*UGUEST";
            ascCode = 85;
            asciiStr += recordSp + ascCode.ToString("X"); // *U
            byte[] uBytes = Encoding.ASCII.GetBytes("GUEST");
            foreach (byte byt in uBytes)
            {
                asciiStr += byt.ToString("X");
            }

            string[] sDate0 = clsPdf.startedAt.Split(' ');
            string[] sDate1 = sDate0[0].Split('-');
            string[] sDate2 = sDate0[1].Split(':');

            string[] eDate0 = clsPdf.endAt.Split(' ');
            string[] eDate1 = eDate0[0].Split('-');
            string[] eDate2 = eDate0[1].Split(':');

            string dDate = sDate1[0] + sDate1[1] + sDate1[2] + sDate2[0] + sDate2[1];
            writteData += "*D" + dDate;
            ascCode = 68;
            asciiStr += recordSp + ascCode.ToString("X"); // *D
            byte[] dBytes = Encoding.ASCII.GetBytes(dDate);
            foreach (byte byt in dBytes)
            {
                asciiStr += byt.ToString("X");
            }

            string oDate = eDate1[0] + eDate1[1] + eDate1[2] + eDate2[0] + eDate2[1];
            writteData += "*O" + oDate;
            ascCode = 79;
            asciiStr += recordSp + ascCode.ToString("X"); // *O
            byte[] oBytes = Encoding.ASCII.GetBytes(oDate);
            foreach (byte byt in oBytes)
            {
                asciiStr += byt.ToString("X");
            }

            writteData += "*J5";
            ascCode = 74;
            int nn = 5;
            asciiStr += recordSp + ascCode.ToString("X") + nn.ToString("X"); // *J5

            string hexString = formatStr(asciiStr, -1);

            string[] resArr = new string[15];
            resArr[0] = writteData;
            resArr[1] = hexString;  
            resArr[2] = hexString.Length.ToString();  

            // int retInt = PMSifRegister("", "");           

            byte mode = 0x00;
            byte[] snr = new byte[7] { 0, 0, 0, 0, 0, 0, 0 };
            string[] blk_list = new string[12]{ "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15" };            
            
            string keycardData = "FCFF0F000000FCFF0F000000FCFF0FF10000FCFF0F000000FCFF0F000000FCEF0F000000FCFF0F0000C0FFFFFF030016";
            
            int blk_count = 12;
            for (int i = 0; i < blk_count; i++) 
            {
                byte blk_add = Convert.ToByte(blk_list[i], 16);

                string subHexString = keycardData.Substring(8 * i, 8);
                resArr[i+3] = subHexString;

                string bufferStr = "";
                bufferStr = formatStr(subHexString, -1);

                byte[] buffer = new byte[4];
                convertStr(buffer, bufferStr, 4);

                // int nRet = UL_HLWrite(mode, blk_add, snr, buffer);
            }

            return resArr;
        }
    }
*/});

var edgeReadInfo = edge.func(function () {/*
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

    public class Startup
    {
        [DllImport("function.dll")]
        public static extern int UL_HLRead(byte mode, byte blk_add, [In]byte[] snr, [In]byte[] buffer);

        private string showData(byte[] data, int s, int e)
        {
            string txt = "";
            for (int i = 0; i < e; i++) {
                if (data[s + i] < 0)
                    data[s + i] = Convert.ToByte(Convert.ToInt32(data[s + i]) + 256);
            }

            for (int i = 0; i < e; i++) {
                txt += data[s + i].ToString("X2")+" ";
            }
            return txt;
        }

        public async Task<object> Invoke(dynamic input)
        {
            byte mode = (byte)0x00;
            byte blk_add = Convert.ToByte("04", 16);

            byte[] snr = new byte[7];
            byte[] buffer = new byte[16];

            int nRet = UL_HLRead(mode, blk_add, snr, buffer);
            if (nRet != 0) {
                return "";
            } else {
                string bufferData = showData(buffer, 0, 16);
                return bufferData;
            }
        }
    }
*/});

var decodeKeyData = edge.func(function () {/*
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
    using System.Runtime.CompilerServices;
    using System.Diagnostics;
    using System.Threading;
    using System.Text.RegularExpressions;

    public class Startup
    {
        public static byte[] FromHex(string hex)
        {
            hex = hex.Replace("-", "");
            byte[] raw = new byte[hex.Length / 2];
            for (int i = 0; i < raw.Length; i++)
            {
                raw[i] = Convert.ToByte(hex.Substring(i * 2, 2), 16);
            }
            return raw;
        }

        public async Task<object> Invoke(dynamic input)
        {
            string writteData = input.keyData;
            byte[] data = FromHex(writteData);
            string s = Encoding.Default.GetString(data);

            return s;
        }
    }
*/});

// constructor
const UsbRfid = function (obj) {

};

UsbRfid.readInfo = (reqBody, result) => {
    edgeReadInfo(reqBody, function (error, retVal) {
        if (error) throw error;
        console.log(retVal);
        result(null, { serNum: retVal });
    });
};

UsbRfid.writePmKey = (pdfs, result) => { 
    edgeWritePmKey(pdfs, function (error, retVal) {
        if (error) throw error;
        console.log(retVal);    
        result(null, { retInt: retVal, ...pdfs });
    });
};

UsbRfid.decodeKey = (rfidKey, result) => { 
    decodeKeyData(rfidKey, function (error, retVal) {
        if (error) throw error;
        console.log(retVal);    
        result(null, { retInt: retVal, ...rfidKey });
    });
};

module.exports = UsbRfid;

