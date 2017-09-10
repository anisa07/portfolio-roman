var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/portfolio', ['home', 'aboutme','contacts','projects','events']);

var today = new Date();
function isNew(data){
    var dayFromArray = new Date((data.date.slice(3,6) + data.date.slice(0,3) + data.date.slice(7)));
    return dayFromArray >= today
}
function isOld(data){
    var dayFromArray = new Date((data.date.slice(3,6) + data.date.slice(0,3) + data.date.slice(7)));
    return dayFromArray < today
}

// Get Home data
router.get('/home', function(req, res, next){
    db.home.find(function(err, home){
        if(err){
            res.send(err);
        }
        res.json(home);
    });
});

// Get Aboutme data
router.get('/aboutme', function(req, res, next){
    db.aboutme.find(function(err, aboutme){
        if(err){
            res.send(err);
        }
        res.json(aboutme);
    });
});

// Get Contacts data
router.get('/contactlist', function(req, res, next){
    db.contacts.find(function(err, contacts){
        if(err){
            res.send(err);
        }
        res.json(contacts);
    });
});

// Get Aboutme data
router.get('/projectlist', function(req, res, next){
    db.projects.find(function(err, projects){
        if(err){
            res.send(err);
        }
        res.json(projects);
    });
});

router.get('/futureevents', function(req, res, next){
    db.events.find(function(err, events){
        if(err){
            res.send(err);
        }

        var future_events = events.filter(isNew);
        res.json(future_events);
    });
});

router.get('/getnumofpages', function(req, res, next){
    db.events.find(function(err, events){
        if(err){
            res.send(err);
        }
        var future_events = events.filter(isNew);
        var num = Math.ceil((events.length - future_events.length)/3);
        res.json(num);
    });
});

router.get('/pastevents/:page', function(req, res, next){
    db.events.find(function(err, events){
        if(err){
            res.send(err);
        }
        var past_events = events.filter(isOld);
        var slice_past = [];
        if (((req.params.page-1)*3 + 3) < past_events.length){
            slice_past = past_events.slice((req.params.page-1)*3, ((req.params.page-1)*3 + 3))
        } else {
            slice_past = past_events.slice((req.params.page-1)*3);
        }
        res.json(slice_past);
    });
});


// Get Single Task
// router.get('/todo/:id', function(req, res, next){
//     db.todos.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, todo){
//         if(err){
//             res.send(err);
//         }
//         res.json(todo);
//     });
// });
//
// //Save todo
// router.post('/new', function(req, res, next){
//     var todo = req.body;
//     if(!todo.title || !(todo.isDone + '')){
//         res.status(400);
//         res.json({
//             "error": "Bad Data"
//         });
//     } else {
//         db.todos.save(todo, function(err, todo){
//             if(err){
//                 res.send(err);
//             }
//             res.json(todo);
//         });
//     }
// });
//
// // Delete todo
// router.delete('/todo/:id', function(req, res, next){
//     db.todos.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, todo){
//         if(err){
//             res.send(err);
//         }
//         res.json(todo);
//     });
// });
//
// // Update todo
// router.put('/todo/:id', function(req, res, next){
//     var todo = req.body;
//     var updtodo = {};
//
//     if(todo.isDone){
//         updtodo.isDone = todo.isDone;
//     }
//
//     if(todo.title){
//         updtodo.title = todo.title;
//     }
//
//     if(!updtodo){
//         res.status(400);
//         res.json({
//             "error":"Bad Data"
//         });
//     } else {
//         db.todos.update({_id: mongojs.ObjectId(req.params.id)},updtodo, {}, function(err, todo){
//             if(err){
//                 res.send(err);
//             }
//             res.json(todo);
//         });
//     }
// });

module.exports = router;