const mongoose = require('mongoose');


var info = mongoose.model('info',{
    Name:String,
    Work:String,
    Mood:String
})

module.exports = info