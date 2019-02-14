const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for the db
let ProjectSchema = new Schema({
  projectName: { type: String, required: true, unique: true },
});

//* Model for the schema
let Project = mongoose.model('Project', ProjectSchema);

// make this available to the users in our Node applications
module.exports = Project;