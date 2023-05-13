var edge = require('edge-js');

var edgeInitPort = edge.func(function () {/*
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

        string cboPort = "USBAuto";
        string cboBandrate = "115200";
        int m_iInit = -1, r = -1, s = -1, b = -1;

        public async Task<object> Invoke(dynamic input)
        {
            StringBuilder sPort = new StringBuilder(cboPort, cboPort.Length);
            int iBaudrate = int.Parse(cboBandrate);
            r = SetPrintport(sPort, iBaudrate);

            s = SetUsbportauto();

            m_iInit = SetInit();
            if (m_iInit == 0)
            {
                b = SetCommandmode(3);
            }
            
            return s;
        }
    }
*/});

// constructor
const InitPort = function (obj) {

};

InitPort.setPrintPort = (thermal, result) => {
    edgeInitPort("edgeInitPort", function (error, retVal) {
        if (error) throw error;
        console.log(retVal);
        result(null, { retInt: retVal, ...thermal });
    });
};

module.exports = InitPort;

