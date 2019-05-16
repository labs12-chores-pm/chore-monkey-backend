const db = require('../data/config.js')

module.exports = {
    get,
    add,
    update,
    remove
    // getByGroup,
    // getByUser,
    // getById,
  }
// this should get all the comments (findAll)
  function get() {
    return db('comments')
  }
//   this is the post function (create)
  function add(comment) {
    return db('comments')
      .returning('id')
      .insert(comment)
      .into('comments')
  }
//   edit/(update) 
  function update(id, changes) {
    return db('comments')
      .returning('id')
      .where({ id })
      .update(changes)
  }
//   this is the delete route (delete)
  function remove(id) {
    return db('comments')
      .returning('id')
      .where({ id })
      .del()
  }

//   module.exports = (app) => {
//     const comments = require('');

//     // Create a new Comments
//     app.post('/comments', comments.create);

//     // Retrieve all Comments
//     app.get('/comments', comments.findAll);

//     // Retrieve a single Comment with commentId
//     app.get('/coments/:commentId', comments.findOne);

//     // Update a Comment with commentId
//     app.put('/comments/:commentId', comments.update);

//     // Delete a Comment with commentId
//     app.delete('/comments/:commentId', comments.delete);
// }

//trying to get this online to github