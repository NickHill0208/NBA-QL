const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    fName: String,
    lName: String,
    teamId: String,
    number: Number
});

module.exports = mongoose.model('Player', playerSchema);