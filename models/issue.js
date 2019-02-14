const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for the db
let IssueSchema = new Schema({
  //project: { type: String, required: true },
  projectId: { type: Schema.Types.ObjectId, ref: 'project', required: true },
  issue_title: { type: String, required: true },
  issue_text: { type: String, required: true },
  assigned_to: { type: String},
  status_text: { type: String},
  open: {type: Boolean, required: true},
  created_by: { type: String, required: true },
  created_on: { type: Date, required: true },
  updated_on: { type: Date, required: true }
});

//* Model for the schema
let Issue = mongoose.model('Issue', IssueSchema);

// make this available to the users in our Node applications
module.exports = Issue;