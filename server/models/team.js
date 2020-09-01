const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    location: String,
    simpleName: String,
    teamName: String
});

module.exports = mongoose.model('Team', teamSchema);