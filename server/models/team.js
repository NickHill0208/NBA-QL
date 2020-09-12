const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    abbreviation: String,
    location: String,
    simpleName: String,
    teamName: String
});

module.exports = mongoose.model('teams', teamSchema);