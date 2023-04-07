
// constructor
const Pdfs = function(pdfs) {
  this.fullName = pdfs.fullName;
  this.pmKey = pdfs.pmKey;
  this.lockerNumber = pdfs.lockerNumber;
  this.bookType = pdfs.bookType;
  this.startedAt = pdfs.startedAt;
  this.endAt = pdfs.endAt;
};

User.create = (newPdf, result) => {
  const pdfName = newPdf.bookType == 'EMOS-3' ? 'Receipt-3.pdf' : 'Receipt-5.pdf';
  result(null, { pdfName: pdfName, ...newPdf });
};

module.exports = Pdfs;
