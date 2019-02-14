/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
    suite('POST /api/issues/{project} => object with issue data', function() {
      
      test('Every field filled in', function(done) {
       chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'Text',
          created_by: 'Functional Test - Every field filled in',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end(function(err, res){
          assert.equal(res.status, 201);
          assert.equal(res.body.issue_title, 'Title');
          assert.equal(res.body.issue_text, 'Text');
          assert.equal(res.body.created_by, 'Functional Test - Every field filled in');
          assert.equal(res.body.assigned_to, 'Chai and Mocha');
          assert.equal(res.body.status_text, 'In QA');
          assert.property(res.body, 'created_on');
          assert.property(res.body, 'updated_on');
          assert.equal(res.body.open, true);
          assert.property(res.body, '_id');
          done();
        });
      });
      
      test('Required fields filled in', function(done) {
       chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'Text',
          created_by: 'Functional Test - Required fields filled in'
        })
        .end(function(err, res){
          assert.equal(res.status, 201);
          assert.equal(res.body.issue_title, 'Title');
          assert.equal(res.body.issue_text, 'Text');
          assert.equal(res.body.created_by, 'Functional Test - Required fields filled in');
          assert.property(res.body, 'created_on');
          assert.property(res.body, 'updated_on');
          assert.equal(res.body.open, true);
          assert.property(res.body, '_id');
          done();
        });
      });
      
      test('Missing required field: Issue title', function(done) {
        chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: '',
          issue_text: 'Text',
          created_by: 'Functional Test - Missing required field',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end(function(err, res){
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'Issue Title is required');
          done(); 
        });
      });
      
      test('Missing required field: Issue text', function(done) {
        chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: '',
          created_by: 'Functional Test - Missing required field',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end(function(err, res){
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'Issue Text is required');
          done(); 
        });
      });

      test('Missing required field: Created by', function(done) {
        chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'Text',
          created_by: '',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end(function(err, res){
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'Created By is required');
          done(); 
        });
      });
  });
    
    suite('PUT /api/issues/{project} => result object', function() {
      
      test('Missing required fields for update', function(done) {
        chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'Text',
          created_by: 'Functional Test - Missing required fields for update'
        })
        .end(function(err, res){
          assert.equal(res.status, 201);
          assert.equal(res.body.issue_title, 'Title');
          assert.equal(res.body.issue_text, 'Text');
          assert.equal(res.body.created_by, 'Functional Test - Missing required fields for update');
          let id = res.body._id; 
          
          chai.request(server)
          .put('/api/issues/test')
          .send({_id: id,
                 issue_title: 'New title',
                 issue_text: '',
                 created_by: 'New created_by'})
          .end(function(err, res) {            
            assert.equal(res.status, 400);
            assert.equal(res.body.error, 'Issue Text is required');
            done();
          })
        });       
      });
      
      test('One field to update', function(done) {
        chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'Text',
          created_by: 'Functional Test - One field to update'
        })
        .end(function(err, res){
          assert.equal(res.status, 201);
          assert.equal(res.body.issue_title, 'Title');
          assert.equal(res.body.issue_text, 'Text');
          assert.equal(res.body.created_by, 'Functional Test - One field to update');
          assert.equal(res.body.open, true);
          let id = res.body._id; 
          
          chai.request(server)
          .put('/api/issues/test')
          .send({_id: id,
                 issue_title: 'New title updated'
          })
          .end(function(err, res) {            
            assert.equal(res.status, 201);
            assert.equal(res.body.success, id + ' updated successfully');
            done();
          })
        });       
      });
      
      test('Multiple fields to update', function(done) {
        chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'Text',
          created_by: 'Functional Test - Multiple fields to update'
        })
        .end(function(err, res){
          assert.equal(res.status, 201);
          assert.equal(res.body.issue_title, 'Title');
          assert.equal(res.body.issue_text, 'Text');
          assert.equal(res.body.created_by, 'Functional Test - Multiple fields to update');
          let id = res.body._id; 
          
          chai.request(server)
          .put('/api/issues/test')
          .send({_id: id,
                 issue_title: 'New title updated',
                 issue_text: 'New text updated',
                 created_by: 'New created_by'
          })
          .end(function(err, res) {            
            assert.equal(res.status, 201);
            assert.equal(res.body.success, id + ' updated successfully');
            done();
          })
        });       
      });
      
    });
    
    suite('GET /api/issues/{project} => Array of objects with issue data', function() {
      
      test('No filter', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
      test('One filter', function(done) {
        chai.request(server)
        .get('/api/issues/test?assigned_to=Bob')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.equal(res.body.length, 3); //Three matching this filter are already in DB        
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
      test('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
        chai.request(server)
        .get('/api/issues/test?assigned_to=Bob&status_text=pending')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.equal(res.body.length, 2); //Two matching this filter are already in DB        
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
    });
    
    suite('DELETE /api/issues/{project} => result object', function() {
      
      test('No _id', function(done) {
        chai.request(server)
        .delete('/api/issues/test')
        .send({})
        .end(function(err,res){
          assert.equal(res.status, 400);
          assert.equal(res.body.error, "Id missing");
          done();
        })
      });
      
      test('Valid _id', function(done) {
        chai.request(server)
        .delete('/api/issues/test')
        .send({_id: '1290331'})
        .end(function(err,res){
          assert.equal(res.status, 400);
          assert.equal(res.body.error, "Not a valid Id");
          done();
        })
      });
   
      test('Delete issue', function(done) {
        chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'Text',
          created_by: 'Functional Test - Delete issue'
        })
        .end(function(err, res){
          assert.equal(res.status, 201);
          assert.equal(res.body.issue_title, 'Title');
          assert.equal(res.body.issue_text, 'Text');
          assert.equal(res.body.created_by, 'Functional Test - Delete issue');
          let id = res.body._id; 
          
          chai.request(server)
          .delete('/api/issues/test')
          .send({_id: id})
          .end(function(err, res) {            
            assert.equal(res.status, 201);
            assert.equal(res.body.success, 'Issue Id ' + id + ' deleted successfully');
            done();
          })
        });       
      });
      
    });

});
