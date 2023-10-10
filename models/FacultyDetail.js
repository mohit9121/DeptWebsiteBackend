const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  researchInterest: {
    type: [String],
  },
  infoForProspectiveStudents: {
    type: String,
  },
  bio: {
    type: String,
  },
  image: {
    type: String, // You can store the image URL here
  },
});

const FacultyDetail = mongoose.model('FacultyDetail', facultySchema);

module.exports = FacultyDetail;
