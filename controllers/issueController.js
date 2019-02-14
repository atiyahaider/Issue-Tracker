const getDb = require('../util/db').getDb;
const Issue = require('../models/issue');
const getProject = require('../controllers/projectController').getProject;
const moment = require('moment');

module.exports = {
    addIssue: async (req, res, next) => {
        try {
            let projName = req.params.project;
            let projId = await getProject(projName, next);  //get the projectId

            let issue = new Issue(req.body);
            issue.projectId = projId;
            issue.open = true;
            issue.created_on = new Date();
            issue.updated_on = issue.created_on;
            await issue.save();

            let displayData = issue.toObject();
            delete displayData.__v;
            delete displayData.projectId;
            res.status(201).json(displayData);  //Return the new issue in json response
        } catch(err)  {
            next(err);
        }
    },

    getIssue: async (req, res, next) => {
        try {
            let data = await Issue.findById(req.body._id);
            res.status(200).json(data);
        } catch(err)  {
            next(err);
        }
    },

    updateIssue: async (req, res, next) => {
        try {
            req.body.updated_on = new Date();
            await Issue.findByIdAndUpdate(req.body._id, req.body);
            res.status(201).json({success: req.body._id + ' updated successfully'});
        } catch(err)  {
            next(err);
        }
    },

    getIssues: async (req, res, next) => {
        try {
            let filters = req.query;
            //remove any empty fields
            Object.keys(filters).forEach(key => {
                if (!filters[key])
                  delete filters[key];
            });
          
            //get the projectId
            let projName = req.params.project;
            let projId = await getProject(projName, next);
            if (!projId)
              res.status(409).json({error: 'Project not found'});
            filters.projectId = projId;

            // Add regex to text fields to do case insensitive search
            //  {'issue_text': { $regex : new RegExp(issue_text, "i") } }
            Object.keys(filters).forEach(key => {
                if (['issue_title', 'issue_text', 'created_by', 'status_text', 'assigned_to'].includes(key))
                  filters[key] = { '$regex': new RegExp(filters[key], "i") };
            });

            let data = await Issue.find(filters);
            res.status(200).json(data);
        } catch(err) {
            next(err);
        }
    },
  
    deleteIssue: async (req, res, next) => {
        try {
            await Issue.findByIdAndDelete(req.body._id);
            res.status(201).json({success: 'Issue Id ' + req.body._id + ' deleted successfully'});
        } catch(err) {
            next(err);
        }
    }
}