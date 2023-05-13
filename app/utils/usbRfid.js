var edgeCS = require('edge-js');

var edgeCSWritePmKey = edgeCS.func(function () {/*
    using System.Threading.Tasks;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.Drawing;
    using System.Linq;
    using System.Text;
    using System.Runtime.InteropServices;
    using System.IO;
    using System.IO.Ports;
    using System.Reflection;
    using System.Runtime.CompilerServices;
    using System.Diagnostics;
    using System.Threading;
    using System.Text.RegularExpressions;
    using System.Runtime.Serialization.Formatters.Binary;
    using System.Runtime.Serialization;

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

        [DllImport(@"C:\Program Files (x86)\ASSA ABLOY\Vision\pmsif.dll")]
        public static extern int PMSifRegister(string szLicense, string szAppl);

        [DllImport(@"C:\Program Files (x86)\ASSA ABLOY\Vision\pmsif.dll")]
        public static extern int PMSifUnregister();

        [DllImport(@"C:\Program Files (x86)\ASSA ABLOY\Vision\pmsif.dll")]
        public static extern IntPtr PMSifReturnKcdLcl(string ff, string Dta, bool Dbg, string szOpId, string szOpFirst, string szOpLast);

        [DllImport(@"C:\Program Files (x86)\ASSA ABLOY\Vision\pmsif.dll")]
        public static extern void PMSifEncodeKcdLcl(string ff, string Dta, bool Dbg, string szOpId, string szOpFirst, string szOpLast);

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

        private string convertStrToAscii(string dataStr)
        {
            byte[] strBytes = Encoding.ASCII.GetBytes(dataStr);
            string txt = String.Empty;
            foreach (byte by in strBytes)
            {
                 txt += by.ToString("X2") + " ";
            }
            return txt;
        }

        public async Task<object> Invoke(dynamic input)
        {   
            ClsPdf clsPdf = new ClsPdf();
            clsPdf.initWithDynamic(input);

            string TmpDta = "";
            string ffCmd = "54";  // ascii 69, character E
            string ffRS = "1E ";  // ascii 30, record separater
            string ffR = "52 ";  // ascii 82, character R
            string ffT = "54 ";  // ascii 84, character T
            string ffF = "46 ";  // ascii 70, character F
            string ffN = "4E ";  // ascii 78, character N
            string ffU = "55 ";  // ascii 85, character U
            string ffD = "44 ";  // ascii 68, character D
            string ffO = "4F ";  // ascii 79, character O
            string ffJ = "4A ";  // ascii 74, character J
            string ff1 = "35 ";  // ascii 53, character 5
            string ffS = "53 ";  // ascii 83, character S
            string ffNull = "00";  // Null, 0x00

            // string rNum = Regex.Replace(clsPdf.roomNum,"[^0-9]","");
            string rNum = convertStrToAscii("101");
            TmpDta = ffR + rNum;

            string rRoomTyp = convertStrToAscii("SINGLE");
            TmpDta += ffRS + ffT + rRoomTyp;

            string rLname = convertStrToAscii(clsPdf.lastName);
            TmpDta += ffRS + ffN + rLname;

            string rFname = convertStrToAscii(clsPdf.firstName);
            TmpDta += ffRS + ffF + rFname;

            string rUtype = convertStrToAscii("GUEST");
            TmpDta += ffRS + ffU + rUtype;

            string[] eDate0 = clsPdf.endAt.Split(' ');
            string[] eDate1 = eDate0[0].Split('-');
            string[] eDate2 = eDate0[1].Split(':');

            string oDate = eDate1[0] + eDate1[1] + eDate1[2] + eDate2[0] + eDate2[1];
            TmpDta += ffRS + ffO + convertStrToAscii(oDate);

            string[] sDate0 = clsPdf.startedAt.Split(' ');
            string[] sDate1 = sDate0[0].Split('-');
            string[] sDate2 = sDate0[1].Split(':');

            string dDate = sDate1[0] + sDate1[1] + sDate1[2] + sDate2[0] + sDate2[1];
            TmpDta += ffRS + ffD + convertStrToAscii(dDate);

            TmpDta += ffRS + ffJ + ff1;

            TmpDta += ffNull;

            string[] resArr = new string[15];
            resArr[0] = TmpDta; 

            Directory.SetCurrentDirectory(@"C:\Program Files (x86)\ASSA ABLOY\Vision\");

            int retVal = PMSifRegister("42860149", "Test_Program");
            resArr[1] = retVal.ToString(); 

            resArr[2] = "";
            try 
            {
                IntPtr resPtr = PMSifReturnKcdLcl(ffCmd, TmpDta, false, "7289", "Jason", "Phillips");
                byte[] byteArr = new byte[512];
                Marshal.Copy(resPtr, byteArr, 0, 512);

                string txt = "";
                for (int i = 0; i < 512; i++) {
                    txt += byteArr[i].ToString() + " ";
                }

                resArr[2] = txt;
            }
            catch (Exception e)
            {
                resArr[2] = e.Message;
            }

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

var edgeCSReadInfo = edgeCS.func(function () {/*
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

// constructor
const UsbRfid = function (obj) {

};

UsbRfid.readInfo = (reqBody, result) => {
    edgeCSReadInfo(reqBody, function (error, retVal) {
        if (error) throw error;
        console.log(retVal);
        result(null, { serNum: retVal });
    });
};

UsbRfid.writePmKey = (pdfs, result) => { 
    edgeCSWritePmKey(pdfs, function (error, retVal) {
        if (error) throw error;
        console.log(retVal);    
        result(null, { retInt: retVal, ...pdfs });
    });
};

module.exports = UsbRfid;

