module.exports = {
    requiredFields: () => {
        return (req, res, next) => {
            if(req.body.issue_title !== undefined && req.body.issue_title.trim() === '')
                return res.status(400).json({error: 'Issue Title is required'});
            if(req.body.issue_text !== undefined && req.body.issue_text.trim() === '') 
                return res.status(400).json({error: 'Issue Text is required'});  
            if(req.body.created_by !== undefined && req.body.created_by.trim() === '') 
                return res.status(400).json({error: 'Created By is required'});  
            //if no error
            next();
        }
    },

    id: () => {
        return (req, res, next) => {
            let id = req.body._id;

            if (id === undefined) // No Id
                return res.status(400).json({error: 'Id missing'});  
            if (!id.match(/^[0-9a-fA-F]{24}$/))  // Not a valid ObjectId
                return res.status(400).json({error: 'Not a valid Id'});  
            else    
                next();
        }
    }
}