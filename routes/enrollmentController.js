const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Enrollment } = require('../models/enrollment');

router.post('/', (req, res) => {
    var enrollment = new Enrollment({
        course: req.body.course,
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email 
    });
    enrollment.save((err, doc) => {
        if (!err) { 
            res.send(doc);
            console.log(doc);
         }
        else { console.log('Error in enrolling : ' + JSON.stringify(err, undefined, 2)); }
    });
});

/* get request for chat group */
router.get('/:room/:username', function(req,res,next){
    Enrollment.find({course:req.params.room, username:req.params.username}).exec()
    .then(doc=>{
        if(doc.length>=1){
            res.json({success:true,msg:'member is exist'});
        }
        else{
            res.json({success:false,msg:'member is not exist'});
        }
    });
      
});

/* for student dashboard */
router.get('/:username', function(req,res,next){
    Enrollment.find({username:req.params.username}).exec()
    .then(doc=>{
        res.json(doc);
    });
});





module.exports = router;