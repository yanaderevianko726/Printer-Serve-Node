var edge = require('edge');

var WriteCrapVB = edge.func('vb', function () {/*
    Async Function(Input As Object) As Task(Of Object)
        Return Await Task.Run(Function()
            Return "NodeJS Welcomes: " & Input.ToString()
        End Function)
    End Function
*/});

// constructor
const RFIDEncoder = function (obj) {

};

RFIDEncoder.encodeKey = (pdfs, result) => { 
    edgeVBWritePmKey('VB', function (error, result) {
        if (error) throw error;
        console.log(result); // Returns "NodeJS Welcomes: VB"
    });
};

module.exports = RFIDEncoder;

