/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var IssueSchema = require('../models/issueModel.js');


mongoose
  .connect(process.env.MONGO_URI, { useUnifiedTopology: true, useFindAndModify: false, useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('DB Connected!'))
  .catch(err => {
    console.log(Error, err.message);
  });


module.exports = function (app) {
  
  
  

  app.route('/api/issues/:project')
  
  
    .get(function (req, res, next) {
      IssueSchema.find({})
        .exec(function(err, data) {
          if (err) { return next(err) };
        console.log(data)
          res.json(data);;
        });
    })
    
  
  
  
    .post(function (req, res, next) {
    
      if (!req.body.issue_title || !req.body.issue_text || !req.body.created_by) {
        res.json({error: 'Missing data. Please fill in all required fields.'})
      } else {
        const newIssue = new IssueSchema({
          issue_title: req.body.issue_title,
          issue_text: req.body.issue_text,
          created_by: req.body.created_by,
          assigned_to: req.body.assigned_to,
          status_text: req.body.status_text
        });
        
        newIssue.save(function(err, data) {
          if (err) { return next(err) };
          res.json(data);
        });  
      }
     
    })
    
  
  
  
    .put(function (req, res, next) {
      let userId = req.body._id;
      let newData = req.body;
      
      // delete any empty fields and the _id from newData
      for (var [key, value] of Object.entries(newData)) { 
        if (value == '' || key == '_id') { 
          delete newData[key];
        };
      };
    
      console.log(newData);
      if (Object.keys(newData).length === 0) {
        res.json({error: 'All fields are empty, Send some data to modify'})
      } else {
        IssueSchema.findOneAndUpdate({_id: userId}, {$set: newData}, function(err, data) {
          if (err) { return next(err) };
          res.json({done: 'Issue has been updated'});
        });
      }

      
    })
    
  
  
  
    .delete(function (req, res, next) {
      let userId = req.body._id;
      
      IssueSchema.findByIdAndRemove(userId, function(err, data) {
        if (err) { 
          res.json({error: 'There was a problem with the ID you submitted. Please try again.'});
        };
        res.json({done: 'Issue has been deleted'});
      });
    })
  
};
