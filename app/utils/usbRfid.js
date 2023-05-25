var edgeCS = require('edge-js');

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
                txt += data[s + i].ToString("X2");
            }
            return txt;
        }

        public async Task<object> Invoke(dynamic input)
        {
            string readAddr = input.address;
            string[] resultStr = new string[2]{"", ""};

            byte mode = (byte)0x00;
            byte blk_add = Convert.ToByte(readAddr, 16);

            byte[] snr = new byte[7];
            byte[] buffer = new byte[16];

            int nRet = UL_HLRead(mode, blk_add, snr, buffer);
            if (nRet != 0) {
                
            } else {
                resultStr[0] = showData(snr, 0, 7);             
                resultStr[1] = showData(buffer, 0, 4);
            }
            return resultStr;
        }
    }
*/});

var edgeCSWriteInfo = edgeCS.func(function () {/*
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
        [DllImport("function.dll")]
        public static extern int UL_HLWrite(byte mode, byte blk_add, [In]byte[] snr, [In]byte[] buffer);

        public async Task<object> Invoke(dynamic input)
        {   
            string wData = input.wData; 

            int nRet = 1;
            if(wData != ""){
                byte mode = 0x00;
                byte[] snr = new byte[7] { 0, 0, 0, 0, 0, 0, 0 };
                string[] blks = new string[12]{ "04", "05", "06", "07", "08", "09", "0A", "0B", "0C", "0D", "0E", "0F" };            
                
                int blk_count = 12;
                for (int i = 0; i < blk_count; i++) 
                {
                    byte blk_add = Convert.ToByte(blks[i], 16);

                    string subHexString = wData.Substring(8 * i, 8);
                    byte[] buffer = new byte[4];
                    for (int j = 0; j < 4; j++) {
                        buffer[j] = Convert.ToByte(subHexString.Substring(2 * j, 2), 16);
                    }

                    nRet = UL_HLWrite(mode, blk_add, snr, buffer);
                }
            }

            return nRet;  
        }
    }
*/});

// constructor
const UsbRfid = function (obj) {

};

UsbRfid.readCardInfo = (reqBody, result) => {
    edgeCSReadInfo(reqBody, function (error, retVal) {
        if (error) throw error;
        console.log(retVal);
        result(null, { resData: retVal });
    });
};

UsbRfid.writteCardInfo = (reqBody, result) => {
    edgeCSWriteInfo(reqBody, function (error, retVal) {
        if (error) throw error;
        console.log(retVal);
        result(null, { resData: retVal });
    });
};

module.exports = UsbRfid;

