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
    using System.IO;
    using System.IO.Ports;
    using System.Reflection;
    using System.Runtime.CompilerServices;
    using System.Diagnostics;
    using System.Threading;
    using System.Text.RegularExpressions;
    using System.Net.Sockets;
    using System.Runtime.Serialization.Formatters.Binary;
    using System.Runtime.Serialization;

    [Serializable]
    struct SPMSifHdr
    {
        public uint ui32Synch1;  
        public uint ui32Synch2;  
        public ushort ui16Version;  
        public int ui32Cmd;  
        public int ui32BodySize;  
    }

    struct SPMSifRegisterMsg
    {
        public SPMSifHdr hdr1; 
        [MarshalAs(UnmanagedType.ByValArray, SizeConst = 20)] public char[] szLicense; 
        [MarshalAs(UnmanagedType.ByValArray, SizeConst = 20)] public char[] szApplName; 
        public int nRet;  
    }

    struct SPMSifUnregisterMsg
    {
        public SPMSifHdr hdr1; 
        public int nRet;  
    }

    [Serializable]
    struct SPMSifReturnKcdLclMsg
    {
        public SPMSifHdr hdr1; 
        public char ff; 
        [MarshalAs(UnmanagedType.ByValArray, SizeConst = 512)] public char[] Dta; 
        public bool Debug;  
        [MarshalAs(UnmanagedType.ByValArray, SizeConst = 10)] public char[] szOpID; 
        [MarshalAs(UnmanagedType.ByValArray, SizeConst = 16)] public char[] szOpFirst; 
        [MarshalAs(UnmanagedType.ByValArray, SizeConst = 16)] public char[] szOpLast; 
    }

    struct SPMSifVerifyKcdLclMsg
    {
        public SPMSifHdr hdr1; 
        public char ff; 
        public char gg; 
        [MarshalAs(UnmanagedType.ByValArray, SizeConst = 266)] public char[] Kcd; 
        [MarshalAs(UnmanagedType.ByValArray, SizeConst = 512)] public char[] Dta; 
        public bool Debug;  
        [MarshalAs(UnmanagedType.ByValArray, SizeConst = 10)] public char[] szOpID; 
        [MarshalAs(UnmanagedType.ByValArray, SizeConst = 16)] public char[] szOpFirst; 
        [MarshalAs(UnmanagedType.ByValArray, SizeConst = 16)] public char[] szOpLast; 
    }

    struct SPMSifEncodeKcdLclMsg
    {
        public SPMSifHdr hdr1; 
        public char ff; 
        public char[] Dta; 
        public bool Debug;  
        public char[] szOpID; 
        public char[] szOpFirst; 
        public char[] szOpLast; 
    }

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

        const int CMD_REGISTER = 1;
        const int CMD_UNREGISTER = 2;
        const int CMD_ENCODEKCDLCL = 3;
        const int CMD_RETURNKCDLCL = 5;
        const int CMD_VERIFYKCDLCL = 12;
        const int TCP_PORT = 3015;

        System.Net.Sockets.TcpClient clientSocket = new System.Net.Sockets.TcpClient();

        private void SetHeader(int TCmd, SPMSifHdr hdr){
            hdr.ui32Synch1 = Convert.ToUInt32("55555555", 16);
            hdr.ui32Synch2 = Convert.ToUInt32("AAAAAAAA", 16);
            hdr.ui16Version = 1;
            hdr.ui32Cmd = TCmd;
            hdr.ui32BodySize = GetSize(TCmd) - Marshal.SizeOf(typeof(SPMSifHdr));
        }

        private int GetSize(int TCmd) {
            int res = Marshal.SizeOf(typeof(SPMSifHdr));
            switch(TCmd){
                case CMD_REGISTER:
                    res = Marshal.SizeOf(typeof(SPMSifRegisterMsg));
                    break;
                case CMD_UNREGISTER:
                    res = Marshal.SizeOf(typeof(SPMSifUnregisterMsg));
                    break;
                case CMD_ENCODEKCDLCL:
                    res = Marshal.SizeOf(typeof(SPMSifEncodeKcdLclMsg));
                    break;
                case CMD_RETURNKCDLCL:
                    res = Marshal.SizeOf(typeof(SPMSifReturnKcdLclMsg));
                    break;
                case CMD_VERIFYKCDLCL:
                    res = Marshal.SizeOf(typeof(SPMSifVerifyKcdLclMsg));
                    break;
            }
            return res;
        }

        private void connectServer() {
            clientSocket.Connect("127.0.0.1", TCP_PORT);
        }

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

        public static byte[] Serialize<T>(T data) where T : struct
        {
            var formatter = new BinaryFormatter();
            var stream = new MemoryStream();
            formatter.Serialize(stream, data);
            return stream.ToArray();
        }

        public static T Deserialize<T>(byte[] array) where T : struct
        {
            var stream = new MemoryStream(array);
            var formatter = new BinaryFormatter();
            return (T)formatter.Deserialize(stream);
        }

        public async Task<object> Invoke(dynamic input)
        {   
            ClsPdf clsPdf = new ClsPdf();
            clsPdf.initWithDynamic(input);

            connectServer();

            string TmpDta = "";

            int unicode = 30;  // Record Separator
            char character = (char) unicode;
            string recordSp = character.ToString();

            // string rNum = Regex.Replace(clsPdf.roomNum,"[^0-9]","");
            string rNum = "101";
            TmpDta += recordSp + "R" + rNum;

            TmpDta += recordSp + "TSINGLE";
            TmpDta += recordSp + "F" + clsPdf.firstName;
            TmpDta += recordSp + "N" + clsPdf.lastName;
            TmpDta += recordSp + "UGUEST";

            string[] sDate0 = clsPdf.startedAt.Split(' ');
            string[] sDate1 = sDate0[0].Split('-');
            string[] sDate2 = sDate0[1].Split(':');

            string[] eDate0 = clsPdf.endAt.Split(' ');
            string[] eDate1 = eDate0[0].Split('-');
            string[] eDate2 = eDate0[1].Split(':');

            string dDate = sDate1[0] + sDate1[1] + sDate1[2] + sDate2[0] + sDate2[1];
            TmpDta += recordSp + "D" + dDate;

            string oDate = eDate1[0] + eDate1[1] + eDate1[2] + eDate2[0] + eDate2[1];
            TmpDta += recordSp + "D" + oDate;

            TmpDta += recordSp + "J5";

            string[] resArr = new string[14];
            resArr[0] = TmpDta;

            char Cmd = 'G';

            SPMSifReturnKcdLclMsg RetMsg = new SPMSifReturnKcdLclMsg();
            int sz = Marshal.SizeOf(typeof(SPMSifReturnKcdLclMsg));
            byte[] outStream = new byte[sz];

            int indexMsg = 0;
            foreach (var element in outStream)
            {
                outStream[indexMsg] = 0;
                indexMsg++;
            }

            SetHeader(CMD_RETURNKCDLCL, RetMsg.hdr1);

            string opId = "", opFirst = "", opLast = "";

            RetMsg.ff = Cmd;
            RetMsg.Dta = TmpDta.ToCharArray();
            RetMsg.Debug = false;
            RetMsg.szOpID = opId.ToCharArray();
            RetMsg.szOpFirst = opFirst.ToCharArray();
            RetMsg.szOpLast = opLast.ToCharArray();

            NetworkStream serverStream = clientSocket.GetStream();   

            outStream = Serialize(RetMsg);
            serverStream.Write(outStream, 0, outStream.Length);

            int readSz = (int) clientSocket.ReceiveBufferSize;
            byte[] inStream = new byte[readSz];
            serverStream.Read(inStream, 0, readSz);
            string returndata = System.Text.Encoding.ASCII.GetString(inStream); 
            resArr[1] = returndata;  

            byte mode = 0x00;
            byte[] snr = new byte[7] { 0, 0, 0, 0, 0, 0, 0 };
            string[] blk_list = new string[12]{ "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15" };            
            
            string keycardData = "FCFF0F000000FCFF0F000000FCFF0FF10000FCFF0F000000FCFF0F000000FCEF0F000000FCFF0F0000C0FFFFFF030016";
            
            int blk_count = 12;
            for (int i = 0; i < blk_count; i++) 
            {
                byte blk_add = Convert.ToByte(blk_list[i], 16);

                string subHexString = keycardData.Substring(8 * i, 8);
                resArr[i+2] = subHexString;

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

