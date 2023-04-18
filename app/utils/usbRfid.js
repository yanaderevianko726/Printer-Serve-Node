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
        [DllImport("function.dll", EntryPoint = "GetSerNum", CharSet = CharSet.Ansi)]
        public static extern int GetSerNum(byte[] buffer);

        public async Task<object> Invoke(dynamic input)
        {
            byte[] buffer = new byte[9];
            int nRet = GetSerNum(buffer);
            return nRet;
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
    using System.Text.RegularExpressions;
    using System.Runtime.CompilerServices;
    using System.Diagnostics;
    using System.Threading;

    public class Startup
    {
        [DllImport("function.dll", EntryPoint = "GetSerNum", CharSet = CharSet.Ansi)]
        public static extern int GetSerNum(StringBuilder buffer);

        int m_iInit = -1;

        public async Task<object> Invoke(dynamic input)
        {
            return 1;
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
        result(null, { retInt: retVal, ...reqBody });
    });
};

UsbRfid.writePmKey = (reqBody, result) => {
    edgeWritePmKey(reqBody, function (error, retVal) {
        if (error) throw error;
        console.log(retVal);
        result(null, { retInt: retVal, ...reqBody });
    });
};

module.exports = UsbRfid;

