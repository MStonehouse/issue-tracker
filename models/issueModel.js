const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
  issue_title: {type: String, required: true, trim: true},
  issue_text: {type: String, required: true, trim: true},
  created_by: {type: String, required: true, trim: true},
  assigned_to: {type: String, trim: true},
  status_text: {type: String, trim: true},
  open: {type: Boolean, default: true}
},{
  timestamps: {createdAt: 'created_on', updatedAt: 'updated_on'}
});

module.exports = mongoose.model('IssueSchema', IssueSchema);