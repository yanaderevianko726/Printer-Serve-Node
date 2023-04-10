// constructor
const Pdfs = function (pdfs) {
  this.fullName = pdfs.fullName;
  this.pmKey = pdfs.pmKey;
  this.lockerNumber = pdfs.lockerNumber;
  this.bookType = pdfs.bookType;
  this.startedAt = pdfs.startedAt;
  this.endAt = pdfs.endAt;
};

module.exports = Pdfs;
