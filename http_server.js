const express = require('express');
const lodashId = require('lodash-id')
const app     = express();
var low     = require('lowdb');
var fs      = require('lowdb/adapters/FileSync');
var adapter = new fs('db.json');
var db      = low(adapter);

db._.mixin(lodashId);

// configure express to serve static files from public directory
// ------------------------------------------------------------------
app.use(express.static('public'));

// init the data store
db.defaults({ posts: []}).write();

// list posts
app.get('/data', function(req, res){     

    res.send(db.get('posts').value());

});

// ----------------------------------------------------
// add post - test using:
//      curl http://localhost:3000/posts/ping/1/false
// ----------------------------------------------------
app.get('/posts/:title/:id/:published', function(req, res){

    const post = {
        'id' : req.params.id,
        'title' : req.params.title,
        'published' : req.params.published,
    }

    db.get('posts').push(post).write();
    console.log(db.get('posts').value());
    res.send(db.get('posts').value());

});

// ----------------------------------------------------
// filter by published state - test using:
//      curl http://localhost:3000/published/true
// ----------------------------------------------------
app.get('/published/:boolean', function(req, res){
    // YOUR CODE
    let response = db.get('posts').value().filter(publish => publish.published === true)
    res.send(response)
});

// ----------------------------------------------------
// update published value - test using:
//      curl http://localhost:3000/published/1/true
// ----------------------------------------------------
app.get('/published/:id/:boolean', function(req, res){

    // YOUR CODE
    let postId = req.params.id
    let published = req.params.boolean
    let valuesToUpdate = {
        'published': published === 'true'
    }
    db.get('posts').updateById(req.params.id,valuesToUpdate).write()
    res.send('Object successfully update')

});

// ----------------------------------------------------
// delete entry by id - test using:
//      curl http://localhost:3000/delete/5
// ----------------------------------------------------
app.get('/delete/:id/', function(req, res){
    // YOUR CODE
    let itemToRemove = db.get('posts').getById(req.params.id).value()
    console.log(`The object will be removed`);
    db.get('posts').removeById(req.params.id).write()
    res.send("Object successfully removed")
   
});

// start server
// -----------------------
app.listen(3000, function(){
    console.log('Running on port 3000!')
})
