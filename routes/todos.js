var express = require('express');
var router = express.Router();
var mongojs = require ('mongojs');
var db = mongojs('mongodb://kshitu:admin@ds157529.mlab.com:57529/meantodos_kshitu_dev',['todos']);


// Get Todos
router.get('/todos', function(req, res, next){
    db.todos.find (function (err, todos){
            if (err){
                res.send(err);
            } else {
                res.json (todos);
            }
    });
});

// Get Single Todos
router.get('/todo/:id', function(req, res, next){
    db.todos.findOne ({
        _id:mongojs.ObjectId(req.params.id)
     }, function (err, todo){
            if (err){
                res.send(err);
            } else {
                res.json (todo);
            }
    });
});

// Save todo

router.post ('/todo', function (req,res,next){
    var todo = req.body;
    if (!todo.text || !(todo.isCompleted+ '')){
        res.status(400);
        res.json ({
            "Error" : "Invalid Data"
        });
    } else {
        db.save (todo, function(err,result){
            if (err){
                res.send(err);
            } else {
                res.json (result);
            }
        
        } );
    }
});

// Update Todos

router.put('/todo/:id', function (req,res,next){
    var todo = req.body;
    var updObj = {};
    if (todo.isCompleted){
        updObj.isCompleted = todo.isCompleted;
    }

    if (todo.text){
        updobj.text = todo.text
    }
    if (!updObj ){
        res.status (400);
        res.json({
            "error":"Invalid Data"
        });
    } 
        else {
            db.todos.update({
                _id : mongojs.ObjectId(req.param.id)
        }, updObj, {}, function (err,result){
             if (err){
                res.send(err);
            } else {
                res.json (result);
            }
        });
    }

    
});

// Delete Todo 


router.delete( '/todo/:id', function (req,res,next){
     db.todos.remove({
                _id : mongojs.ObjectId(req.param.id)
        }, '', function (err,result){
             if (err){
                res.send(err);
            } else {
                res.json (result);
            }
        });
    });



module.exports = router;