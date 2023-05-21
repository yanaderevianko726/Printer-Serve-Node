var edgeCS = require('edge-js');

var edgeCSEncodeInfo = edgeCS.func(function () {/*
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.Drawing;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using System.Net.Sockets;
    using System.Runtime.InteropServices;
    using System.Runtime.Serialization.Formatters.Binary;
    using System.IO;
    using System.Threading;
    using System.IO.Ports;
    using System.Reflection;
    using System.Text.RegularExpressions;
    using System.Runtime.CompilerServices;
    using System.Diagnostics;

    public class Startup
    {
        [DllImport("function.dll")]
        public static extern int UL_HLRead(byte mode, byte blk_add, [In]byte[] snr, [In]byte[] buffer);

        const int CMD_REGISTER = 1;
        const int CMD_UNREGISTER = 2;
        const int CMD_ENCODEKEDLCL = 3;
        const int CMD_RETURNKCDLCL = 5;
        const int CMD_VERIFYKCDLCL = 12;

        int returnKeyDtaSize = 0, hdrSize = 0, socketReceiveSize = 0;
        byte[] readBytes;

        string cardSerialNum = "", cardUniqueId = "";
        string strRoom = "", strType = "Single Room", strGroup = "Regular Guest", strFname = "", strLname = "", strStartD = "", strEndD = "";
        string strLicense = "23516441", strApplName = "Test_Program";
        string strCmdRet = "";
        string strSysId = "7289", strSysFname = "Jason", strSysLname = "Phillips";

        [StructLayout(LayoutKind.Sequential, Pack = 1)]
        struct SPMSifHdr
        {
            public uint ui32Synch1;
            public uint ui32Synch2;
            public ushort ui16Version;
            public int ui32Cmd;
            public int ui32BodySize;
        }

        [StructLayout(LayoutKind.Sequential, Pack = 1)]
        struct SPMSifRegisterMsg
        {
            public SPMSifHdr hdr1;
            [MarshalAs(UnmanagedType.ByValArray, SizeConst = 20)]
            public byte[] szLicense;
            [MarshalAs(UnmanagedType.ByValArray, SizeConst = 20)]
            public byte[] szApplName;
            public int nRet;
        }

        [StructLayout(LayoutKind.Sequential, Pack = 1)]
        struct SPMSifUnRegisterMsg
        {
            public SPMSifHdr hdr1;
            public int nRet;
        }

        [StructLayout(LayoutKind.Sequential, Pack = 1)]
        struct SPMSifEncodeKcdLclMsg
        {
            public SPMSifHdr hdr1;
            public byte ff;
            [MarshalAs(UnmanagedType.ByValArray, SizeConst = 512)]
            public byte[] Dta;
            public bool Debug;
            [MarshalAs(UnmanagedType.ByValArray, SizeConst = 10)]
            public byte[] szOpId;
            [MarshalAs(UnmanagedType.ByValArray, SizeConst = 16)]
            public byte[] szOpFirst;
            [MarshalAs(UnmanagedType.ByValArray, SizeConst = 16)]
            public byte[] szOpLast;
        }

        [StructLayout(LayoutKind.Sequential, Pack = 1)]
        struct SPMSifReturnKcdLclMsg
        {
            public SPMSifHdr hdr1;
            public byte ff;
            [MarshalAs(UnmanagedType.ByValArray, SizeConst = 512)]
            public byte[] Dta;
            public bool Debug;
            [MarshalAs(UnmanagedType.ByValArray, SizeConst = 10)]
            public byte[] szOpId;
            [MarshalAs(UnmanagedType.ByValArray, SizeConst = 16)]
            public byte[] szOpFirst;
            [MarshalAs(UnmanagedType.ByValArray, SizeConst = 16)]
            public byte[] szOpLast;
        }

        [StructLayout(LayoutKind.Sequential, Pack = 1)]
        struct SPMSifVerifyKcdLclMsg
        {
            public SPMSifHdr hdr1;
            public byte ff;
            public byte gg;
            [MarshalAs(UnmanagedType.ByValArray, SizeConst = 266)]
            public byte[] Kcd;
            [MarshalAs(UnmanagedType.ByValArray, SizeConst = 512)]
            public byte[] Dta;
            public bool Debug;
            [MarshalAs(UnmanagedType.ByValArray, SizeConst = 10)]
            public byte[] szOpId;
            [MarshalAs(UnmanagedType.ByValArray, SizeConst = 16)]
            public byte[] szOpFirst;
            [MarshalAs(UnmanagedType.ByValArray, SizeConst = 16)]
            public byte[] szOpLast;
        }

        private SPMSifHdr SetHeader(int TCmd) {
            SPMSifHdr hdr = new SPMSifHdr();
            hdr.ui32Synch1 = 0x55555555;
            hdr.ui32Synch2 = 0xAAAAAAAA;
            hdr.ui16Version = 1;
            hdr.ui32Cmd = TCmd;
            hdr.ui32BodySize = GetSize(TCmd) - Marshal.SizeOf(hdr);
            return hdr;
        }

        private int GetSize(int TCmd) {
            int result = Marshal.SizeOf(typeof(SPMSifRegisterMsg));
            switch (TCmd) {
                case CMD_UNREGISTER:
                    result = Marshal.SizeOf(typeof(SPMSifUnRegisterMsg));
                    break;
                case CMD_ENCODEKEDLCL:
                    result = Marshal.SizeOf(typeof(SPMSifEncodeKcdLclMsg));
                    break;
                case CMD_RETURNKCDLCL:
                    result = Marshal.SizeOf(typeof(SPMSifReturnKcdLclMsg));
                    break;
                case CMD_VERIFYKCDLCL:
                    result = Marshal.SizeOf(typeof(SPMSifVerifyKcdLclMsg));
                    break;
            }
            return result;
        }

        private void BuildDataFrame(out string Dta)
        {
            char code = (char)30;

            Dta = code.ToString() + "R" + strRoom;
            Dta = Dta + code.ToString() + "T" + strType;
            Dta = Dta + code.ToString() + "F" + strFname;
            Dta = Dta + code.ToString() + "N" + strFname;
            Dta = Dta + code.ToString() + "U" + strGroup;
            Dta = Dta + code.ToString() + "D" + strStartD;
            Dta = Dta + code.ToString() + "O" + strEndD;
            Dta = Dta + code.ToString() + "J1";
            Dta = Dta + code.ToString() + "S" + cardSerialNum;
            Dta = Dta + code.ToString() + "V" + cardUniqueId;
        }

        private void StrPCopy(string str, byte[] dta) {
            char[] strChar = str.ToCharArray();
            for (int i = 0; i < dta.Length; i++)
            {
                if (i < strChar.Length)
                {
                    dta[i] = Convert.ToByte(strChar[i]);
                }
                else
                {
                    dta[i] = 0;
                }
            }
        }

        public async Task<object> Invoke(dynamic input)
        { 
            strFname = input.firstName;
            strLname = input.lastName;
            strRoom = input.roomNum;
            strStartD = input.startedAt;
            strEndD = input.endAt;

            strCmdRet = "";

            byte mode = (byte)0x00;
            byte blk_add = Convert.ToByte("03", 16);

            byte[] snr = new byte[7];
            byte[] buffer = new byte[16];

            string[] resArr = new string[3];
            resArr[0] = "";
            resArr[1] = "";
            resArr[2] = "";

            int nRet = UL_HLRead(mode, blk_add, snr, buffer);

            if (nRet == 0) {
                TcpClient tcpClient = new TcpClient();
                NetworkStream networkStream;

                cardSerialNum = "";
                for(int i=0; i<7; i++)
                {
                    cardSerialNum += snr[i].ToString("X2");
                }
                resArr[0] = cardSerialNum;

                cardUniqueId = "";
                for(int i=0; i<4; i++)
                {
                    cardUniqueId += buffer[i].ToString("X2");
                }
                resArr[1] = cardUniqueId;

                hdrSize = Marshal.SizeOf(typeof(SPMSifHdr));
                returnKeyDtaSize = Marshal.SizeOf(typeof(SPMSifReturnKcdLclMsg)) - hdrSize;
                socketReceiveSize = Marshal.SizeOf(typeof(SPMSifVerifyKcdLclMsg));

                readBytes = new byte[socketReceiveSize];

                try {
                    tcpClient.Connect("127.0.0.1", 3015);

                    SPMSifRegisterMsg RegMsg = new SPMSifRegisterMsg();
                    RegMsg.hdr1 = SetHeader(CMD_REGISTER);

                    RegMsg.szLicense = new byte[20];
                    StrPCopy(strLicense, RegMsg.szLicense);

                    RegMsg.szApplName = new byte[20];
                    StrPCopy(strApplName, RegMsg.szApplName);

                    RegMsg.nRet = 0;

                    var bufferSize1 = Marshal.SizeOf(typeof(SPMSifRegisterMsg));
                    var byteArray1 = new byte[bufferSize1];

                    IntPtr handle1 = Marshal.AllocHGlobal(bufferSize1);
                    try
                    {
                        Marshal.StructureToPtr(RegMsg, handle1, true);
                        Marshal.Copy(handle1, byteArray1, 0, bufferSize1);
                    }
                    finally
                    {
                        Marshal.FreeHGlobal(handle1);
                    }

                    networkStream = tcpClient.GetStream();
                    networkStream.Write(byteArray1, 0, byteArray1.Length);

                    SPMSifReturnKcdLclMsg RetnMsg = new SPMSifReturnKcdLclMsg();
                    RetnMsg.hdr1 = SetHeader(CMD_RETURNKCDLCL);

                    string Tmp = "I";
                    RetnMsg.ff = Convert.ToByte(Tmp[0]);

                    string dta;
                    BuildDataFrame(out dta);

                    RetnMsg.Dta = new byte[512];
                    StrPCopy(dta, RetnMsg.Dta);

                    RetnMsg.Debug = false;

                    RetnMsg.szOpId = new byte[10];
                    StrPCopy(strSysId, RetnMsg.szOpId);

                    RetnMsg.szOpFirst = new byte[16];
                    StrPCopy(strSysFname, RetnMsg.szOpFirst);

                    RetnMsg.szOpLast = new byte[16];
                    StrPCopy(strSysLname, RetnMsg.szOpLast);

                    var bufferSize = Marshal.SizeOf(typeof(SPMSifReturnKcdLclMsg));
                    var byteArray = new byte[bufferSize];

                    IntPtr handle = Marshal.AllocHGlobal(bufferSize);
                    try
                    {
                        Marshal.StructureToPtr(RetnMsg, handle, true);
                        Marshal.Copy(handle, byteArray, 0, bufferSize);
                    }
                    finally
                    {
                        Marshal.FreeHGlobal(handle);
                    }

                    
                    // send returnkey socket in first
                    for(int ii=0; ii< socketReceiveSize; ii++)
                    {
                        readBytes[ii] = 1; 
                    }

                    networkStream = tcpClient.GetStream();
                    await networkStream.WriteAsync(byteArray, 0, byteArray.Length);
                    await networkStream.FlushAsync();

                    await networkStream.ReadAsync(readBytes, 0, socketReceiveSize, CancellationToken.None);

                    int cmdInt = int.Parse(readBytes[hdrSize].ToString());
                    char cmdChar = (char)cmdInt;
                    strCmdRet = cmdChar.ToString();

                    // send returnkey socket in second
                    for(int ii=0; ii< socketReceiveSize; ii++)
                    {
                        readBytes[ii] = 1; 
                    }

                    networkStream = tcpClient.GetStream();
                    await networkStream.WriteAsync(byteArray, 0, byteArray.Length);
                    await networkStream.FlushAsync();

                    await networkStream.ReadAsync(readBytes, 0, socketReceiveSize, CancellationToken.None);

                    cmdInt = int.Parse(readBytes[hdrSize].ToString());
                    cmdChar = (char)cmdInt;
                    strCmdRet = cmdChar.ToString();

                    string encodedKey = "";
                    if(strCmdRet == "0")
                    {
                        for(int i=3; i<99; i++)
                        {
                            int btCode = int.Parse(readBytes[i + hdrSize].ToString());
                            char ch = (char)btCode;
                            encodedKey += ch;
                        }
                        resArr[2] = encodedKey; 
                    }

                    networkStream.Close();
                    tcpClient.Close();
                }
                catch (Exception ex) {
                    resArr[2] = ex.Message; 
                }
            } 

            return resArr;
        }
    }
*/});

// constructor
const RFIDEncoder = function (obj) {

};

RFIDEncoder.encodeKey = (reqBody, result) => {
    edgeCSEncodeInfo(reqBody, function (error, retVal) {
        if (error) throw error;
        console.log(retVal);
        result(null, { retInt: retVal, ...reqBody });
    });
};

module.exports = RFIDEncoder;

