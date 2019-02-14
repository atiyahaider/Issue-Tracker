const express = require('express');
const router = express.Router();
const expect = require('chai').expect;

const issueController = require('../controllers/issueController');
const projectController = require('../controllers/projectController');
const validate = require('../util/validation');

router.route('/projects')
    .get(projectController.getProjects)
    .post(projectController.addProject)
    .delete(validate.id(), projectController.deleteProject);

router.route('/issues/:project')
    .get(issueController.getIssues)
    .get(validate.id(), issueController.getIssue)
    .post(validate.requiredFields(), issueController.addIssue)
    .put(validate.requiredFields(), issueController.updateIssue)
    .delete(validate.id(), issueController.deleteIssue);

module.exports = router;
