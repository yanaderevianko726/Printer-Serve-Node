var edge = require('edge');

var edgeVBEncodeKey = edge.func('vb', function () {/*
    Async Function(Input As Object) As Task(Of Object)
        Return Await Task.Run(Function()
            Return "Downer Welcomes: " & Input.firstName
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

