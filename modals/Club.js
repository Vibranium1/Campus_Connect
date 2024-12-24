const mongoose = require('mongoose');

const clubSch = new mongoose.Schema({
    club: {
        type: String,
    },
})

module.exports =mongoose.model('Club', clubSch);