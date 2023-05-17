var edgeCS = require('edge-js');

var edgeCSEncodeInfo = edgeCS.func(function () {/*
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
        [DllImport(@"C:\Program Files (x86)\ASSA ABLOY\Vision\pmsif.dll")]
        public static extern int PMSifRegister(string szLicense, string szAppl);

        [DllImport(@"C:\Program Files (x86)\ASSA ABLOY\Vision\pmsif.dll")]
        public static extern int PMSifUnregister();

        [DllImport(@"C:\Program Files (x86)\ASSA ABLOY\Vision\pmsif.dll")]
        public static extern IntPtr PMSifReturnKcdLcl(string ff, string Dta, bool Dbg, string szOpId, string szOpFirst, string szOpLast);

        [DllImport(@"C:\Program Files (x86)\ASSA ABLOY\Vision\pmsif.dll")]
        public static extern void PMSifEncodeKcdLcl(string ff, string Dta, bool Dbg, string szOpId, string szOpFirst, string szOpLast);

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

            string[] resArr = new string[3];
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

            return resArr;  
        }
    }
*/});

// constructor
const RFIDEncoder = function (obj) {

};

RFIDEncoder.encodeKey = (pdfs, result) => {
    edgeCSEncodeInfo(pdfs, function (error, retVal) {
        if (error) throw error;
        console.log(retVal);
        result(null, { retInt: retVal, ...pdfs });
    });
};

module.exports = RFIDEncoder;

