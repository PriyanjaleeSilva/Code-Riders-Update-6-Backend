const express = require('express');
var router = express.Router();

var { Teacher } = require('../models/teacher');
var { Enrollment } = require('../models/enrollment');

router.post('/', (req, res) => {
    var teacher = new Teacher({
        course: req.body.course,
        teacher: req.body.teacher
    });
    teacher.save((err, doc) => {
        if (!err) { 
            res.send(doc);
            console.log(doc);
         }
        else { console.log('Error in saving data : ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/', (req, res) => {
    Teacher.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving data : ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:teacher', (req, res) => {
    Teacher.find({teacher: req.params.teacher}, (err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving data : ' + JSON.stringify(err, undefined, 2)); }
    });
});


//Enrollment collection

router.get('/:course', (req, res) => {
    Enrollment.find({course:req.params.course}, (err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving data : ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete("/:enrollmentId", (req, res, next) => {
    const id = req.params.enrollmentId;
    Enrollment.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'Student removed',
            
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

  

module.exports = router;