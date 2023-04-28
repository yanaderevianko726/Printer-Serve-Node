var edge = require('edge-js');

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

        [DllImport("pmsif.dll")]
        public static extern int PMSifRegister(string szLicense, string szAppl);

        [DllImport("pmsif.dll")]
        public static extern int PMSifEncodeKcdLcl(byte ff, string Dta, bool Dbg, string szOpId, string szOpFirst, string szOpLast);

        string lic_code = "BBC7.6027.91B3.3824.8E5D";
        string app_name = "Downer_Defence";

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

            string rNum = Regex.Replace(clsPdf.roomNum,"[^0-9]","");

            string[] sDate0 = clsPdf.startedAt.Split(' ');
            string[] sDate1 = sDate0[0].Split('-');
            string[] sDate2 = sDate0[1].Split(':');

            string[] eDate0 = clsPdf.endAt.Split(' ');
            string[] eDate1 = eDate0[0].Split('-');
            string[] eDate2 = eDate0[1].Split(':');

            string writteData = "*R" + rNum;
            writteData += "*TStandard";
            writteData += "*F" + clsPdf.firstName;
            writteData += "*N" + clsPdf.lastName;
            writteData += "*UGuest";
            writteData += "*D" + sDate1[0] + sDate1[1] + sDate1[2] + sDate2[0] + sDate2[1];
            writteData += "*O" + eDate1[0] + eDate1[1] + eDate1[2] + eDate2[0] + eDate2[1];

            // int Res = PMSifRegister(lic_code, app_name);
            // PMSifEncodeKcdLcl(Cmd, writteData, false, txtSysID.Text, txtSysFName.Text, txtSysLName.Text);

            byte[] bytesWritten = Encoding.Default.GetBytes(writteData); 
            string hexString = BitConverter.ToString(bytesWritten);
            hexString = hexString.Replace("-", "");

            byte mode = 0x00;
            byte[] snr = new byte[7] { 0, 0, 0, 0, 0, 0, 0 };

            string[] blk_list = new string[12]{ "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15" };
            int blk_count = hexString.Length / 8;
            
            if(hexString.Length % 8 > 0){
                blk_count++;
            }
            if(blk_count > 12){
                blk_count = 12;
            }

            string[] resArr = new string[blk_count+4];
            resArr[0] = writteData;
            resArr[1] = hexString;
            resArr[2] = hexString.Length.ToString();
            resArr[3] = blk_count.ToString();

            for (int i = 0; i < blk_count; i++) 
            {
                byte blk_add = Convert.ToByte(blk_list[i], 16);

                string subHexString = "";
                string bufferStr = "";
                int sl = 8;

                if(i < blk_count - 1){
                    subHexString = hexString.Substring(8 * i, 8);
                }else{
                    sl = hexString.Length - 8 * i;
                    if(sl > 8) sl = 8;
                    subHexString = hexString.Substring(8 * i, sl);
                }
                resArr[i+4] = subHexString;

                byte[] buffer = new byte[sl];
                bufferStr = formatStr(subHexString, -1);
                convertStr(buffer, bufferStr, sl / 2);

                int nRet = UL_HLWrite(mode, blk_add, snr, buffer);
            }

            return resArr;
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

