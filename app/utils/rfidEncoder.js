var edgeCS = require('edge-js');

var edgeCSRegisterPMS = edgeCS.func(function () {/*
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

    public class Startup
    {
        [DllImport(@"C:\Program Files (x86)\ASSA ABLOY\Vision\pmsif.dll")]
        public static extern int PMSifRegister(string szLicense, string szAppl);

        public async Task<object> Invoke(dynamic input)
        {
            string[] resArr = new string[1];
            try 
            {
                int regVal = PMSifRegister("42860149", "Test_Program");
                resArr[0] = regVal.ToString();
            }
            catch (Exception e)
            {
                resArr[4] = e.Message;
            }

            return resArr;  
        }
    }
*/});

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
        public static extern int PMSifReturnKcdLcl(StringBuilder ff, StringBuilder Dta, bool Dbg, StringBuilder szOpId, StringBuilder szOpFirst, StringBuilder szOpLast);

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
                 txt += by.ToString("X2");
            }
            return txt;
        }

        public async Task<object> Invoke(dynamic input)
        {   
            ClsPdf clsPdf = new ClsPdf();
            clsPdf.initWithDynamic(input);

            int asciiInt = 2;
            char charOfAscii = (char) asciiInt;
            string strOfChar = charOfAscii.ToString();

            string ffSTX = strOfChar;  // ascii 2, start of text

            asciiInt = 3;
            charOfAscii = (char) asciiInt;
            strOfChar = charOfAscii.ToString();

            string ffETX = strOfChar;  // ascii 3, end of text

            asciiInt = 30;
            charOfAscii = (char) asciiInt;
            strOfChar = charOfAscii.ToString();

            string ffRS = "";  // ascii 30, record separater

            asciiInt = 00;
            charOfAscii = (char) asciiInt;
            strOfChar = charOfAscii.ToString();

            string ffNull = strOfChar;  // Null, 0x00

            string ffCmd = "G";  // ascii 71, character G, 47
            string ffR = "R";  // ascii 82, character R, 52
            string ffT = "T";  // ascii 84, character T, 54
            string ffF = "F";  // ascii 70, character F, 46
            string ffN = "N";  // ascii 78, character N, 4E
            string ffU = "U";  // ascii 85, character U, 55
            string ffD = "D";  // ascii 68, character D, 44
            string ffO = "O";  // ascii 79, character O, 4F
            string ffJ5 = "J5";  // ascii 74, character J, 4A
            string ffS = "S";  // ascii 83, character S, 53

            string TmpDta = "";

            // string rNum = Regex.Replace(clsPdf.roomNum,"[^0-9]","");
            string rNum = convertStrToAscii("101");
            TmpDta += "G" + ffRS + ffR + clsPdf.roomNum;

            string rRoomTyp = convertStrToAscii("Single Room");
            TmpDta += ffRS + ffT + "Single Room";

            string rFname = convertStrToAscii(clsPdf.firstName);
            TmpDta += ffRS + ffF + clsPdf.firstName;

            string rLname = convertStrToAscii(clsPdf.lastName);
            TmpDta += ffRS + ffN + clsPdf.lastName;

            string rUtype = convertStrToAscii("Regular Guest");
            TmpDta += ffRS + ffU + "Regular Guest";

            string[] sDate0 = clsPdf.startedAt.Split(' ');
            string[] sDate1 = sDate0[0].Split('-');
            string[] sDate2 = sDate0[1].Split(':');

            string dDate = sDate1[0] + sDate1[1] + sDate1[2] + sDate2[0] + sDate2[1];
            TmpDta += ffRS + ffD + dDate;

            string[] eDate0 = clsPdf.endAt.Split(' ');
            string[] eDate1 = eDate0[0].Split('-');
            string[] eDate2 = eDate0[1].Split(':');

            string oDate = eDate1[0] + eDate1[1] + eDate1[2] + eDate2[0] + eDate2[1];
            TmpDta += ffRS + ffO + oDate;

            //TmpDta += ffRS + ffJ5;
            //TmpDta += ffNull;

            string[] resArr = new string[4];
            resArr[0] = TmpDta; 

            //Directory.SetCurrentDirectory(@"C:\Program Files (x86)\ASSA ABLOY\Vision\");
            
            //IntPtr pmsApi = LoadLibrary(@"C:\Program Files (x86)\ASSA ABLOY\Vision\pmsif.dll");

            //IntPtr pmsRet = GetProcAddress(pmsApi, "PMSifReturnKcdLcl"); 
            //SPMSifReturnKcdLcl spmsRet = (SPMSifReturnKcdLcl) Marshal.GetDelegateForFunctionPointer(pmsRet, typeof(SPMSifReturnKcdLcl));

            resArr[1] = "";
            resArr[2] = "";
            resArr[3] = "";

            try 
            {
                // IntPtr returnPtr = PMSifReturnKcdLcl(ffCmd, TmpDta, false, "7289", "Jason", "Phillips");

                string sCmd = "G";
                StringBuilder sbCmd = new StringBuilder(sCmd, sCmd.Length);

                string sTmpData = TmpDta;
                StringBuilder sbTmpData = new StringBuilder(sTmpData, sTmpData.Length);

                string sLicense = "7289";
                StringBuilder sbLicense = new StringBuilder(sLicense, sLicense.Length);

                string sSysFN = "Jason";
                StringBuilder sbSysFN = new StringBuilder(sSysFN, sSysFN.Length);

                string sSysLN = "Phillips";
                StringBuilder sbSysLN = new StringBuilder(sSysLN, sSysLN.Length);

                int returnPtr = PMSifReturnKcdLcl(sbCmd, sbTmpData, false, sbLicense, sbSysFN, sbSysLN);
                resArr[1] = returnPtr.ToString();
                resArr[2] = sbTmpData.ToString();

                //int byteSize = 300;
                //byte[] retBytes = new byte[byteSize];
                //Marshal.Copy(returnPtr, retBytes, 0, byteSize);

                //string txt = "";
                //for (int i = 0; i < byteSize; i++) {
                    //txt += retBytes[i].ToString() + " ";
                //}
                //resArr[2] = txt;
            }
            catch (Exception e)
            {
                resArr[3] = e.Message;
            }

            return resArr;  
        }
    }
*/});

// constructor
const RFIDEncoder = function (obj) {

};

RFIDEncoder.registerPMS = (reqBody, result) => {
    edgeCSRegisterPMS(reqBody, function (error, retVal) {
        if (error) throw error;
        console.log(retVal);
        result(null, { retInt: retVal, ...reqBody });
    });
};

RFIDEncoder.encodeKey = (reqBody, result) => {
    edgeCSEncodeInfo(reqBody, function (error, retVal) {
        if (error) throw error;
        console.log(retVal);
        result(null, { retInt: retVal, ...reqBody });
    });
};

module.exports = RFIDEncoder;

