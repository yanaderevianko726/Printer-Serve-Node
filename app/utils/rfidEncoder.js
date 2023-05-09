var edge = require('edge');

var edgeVBEncodeKey = edge.func('vb', function () {/*
    Imports System.Runtime.InteropServices
    Async Function(Input As Object) As Task(Of Object)
        Return Await Task.Run(Function()
            Dim dllPath As String
            dllPath = "C:\Program Files (x86)\ASSA ABLOY\Vision\"
            Return "Downer Welcomes: " & Input.firstName & " " & & dllPath
        End Function)
    End Function              
*/});

// constructor
const RFIDEncoder = function (obj) {

};

RFIDEncoder.encodeKey = (pdfs, result) => { 
    edgeVBEncodeKey(pdfs, function (error, retVal) {
        if (error) throw error;
        console.log(retVal); 
        result(null, { retInt: retVal, ...pdfs });
    });
};

module.exports = RFIDEncoder;

