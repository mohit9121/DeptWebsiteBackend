const mongoose = require('mongoose')

const FacultyAccountSchema1 = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    hashedPassword: {
        type: String, 
        require: true
    }, 
    fid: {
        type: String,
        require: true
    }
})

module.exports = FacultyAccountSchema = mongoose.model('facultyAccountSchema', FacultyAccountSchema1);