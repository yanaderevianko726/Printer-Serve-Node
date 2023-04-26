// constructor
const Pdfs = function (pdfs) {
  this.firstName = pdfs.firstName;
  this.lastName = pdfs.lastName;
  this.pmKey = pdfs.pmKey;
  this.rank = pdfs.rank;
  this.roomKey = pdfs.roomKey;
  this.roomNum = pdfs.roomNum;
  this.mobile = pdfs.mobile;
  this.lockerNumber = pdfs.lockerNumber;
  this.bookType = pdfs.bookType;
  this.vehicle = pdfs.vehicle;
  this.startedAt = pdfs.startedAt;
  this.endAt = pdfs.endAt;
};

module.exports = Pdfs;
