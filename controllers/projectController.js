const Project = require('../models/project');
const getDb = require('../util/db').getDb;
const Issue = require('../models/issue');

module.exports = {
    addProject: async (req, res, next) => {
        try{
            let { projectName } = req.body;
            //check for duplicate project (case insensitive)
            let duplicate = await Project.findOne({'projectName': { $regex : new RegExp('^' + projectName + '$', "i") } });
            if (duplicate)
                res.status(409).json({error: 'Duplicate Project Name, this project already exists'});
            //save project
            else {
                let project = new Project ({projectName: projectName.trim()});
                let data = await project.save();
                res.status(201).json({'projectName': data.project, '_id': data._id}); 
            }
        } catch(err)  {
            next(err);
        }
    },

    getProject: async (projName, next) => {
        try {
            let data = await Project.findOne({'projectName': { $regex : new RegExp('^' + projName.trim() + '$', "i") } }).select('_id');
            return data._id;
        } catch(err){
            next(err);
        }
    },

    getProjects: async (req, res, next) => {
        try {
            let data = await Project.find().sort('projectName');
            res.status(200).json(data);
        } catch(err){
            next(err);
        }
    },
  
    deleteProject: async (req, res, next) => {
        try {
              await Issue.deleteMany({projectId: req.body._id});
              await Project.findByIdAndDelete(req.body._id);
              res.status(201).json({success: 'Project Id: '+ req.body._id + ' deleted'});
        } catch(err){
            next(err);
        }
    }
}