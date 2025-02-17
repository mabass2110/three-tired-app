const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

// Create or use an existing JSON file (replace 'data.json' with your desired filename)
const db = low(new FileSync('db.json'));

const data = {id: 1, title: "Post 1", content: "This is the first post content"}
// init the data store
// ---------------------------
db.defaults({ posts: []}).write();
 db.get('posts').push(data).write()

// count posts
// ----------------------------
// YOUR CODE
const totalPosts = db.get('posts').value().length
console.log(totalPosts)

// find all posts ids
// ----------------------------
// YOUR CODE
const allPostIds = db.get('posts')
  .value() // Get all posts as an array
  .map(post => post.id); // Extract the 'id' property from each post

console.log('All post IDs:', allPostIds);

// find post with published false
// ----------------------------
// YOUR CODE
const publishedFalse = db.get('posts').value().filter(publish => publish.published === false)
console.log(publishedFalse)
