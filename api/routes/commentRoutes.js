const express = require('express')
const router = express.Router()
const db = require('../../data/helpers/commentDb')

// CRUD
// Read
// get
// get by id 
// Create 
// add 
// update
// delete 

// *** GET ALL ** //
router.get("/", (req, res) => {
    db.get()
      .then(comments => {
        res.status(200).json(comments);
      })
      .catch(err => res.status(500).json(err.message));
  });


// *** GET BY ID ** //
router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.getById(id)
      .then(comment => {
        if (comment) {
          res.status(200).json(comment);
        } else {
          res.status(404).json({
            message: "The comment with the specified ID does not exist."
          });
        }
      })
      .catch(err => {
        res.status(500).json(err.message);
      });
  });


// *** DELETE ** //
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      let comment = await db.get(id);
      if (!comment) {
        res
          .status(404)
          .json({ message: "The comment with the specified ID does not exist." });
      }
      await db.remove(id);
      let updatedArray = await db.get();
      return res.status(200).json({
        users: updatedArray,
        message: "successfully deleted"
      });
    } catch (err) {
      res.status(500).json(err.message);
    }
  });


// *** UPDATE ** //
//updates the comment and returns the updated comment

router.put('/:id', (req, res) => {
  let { id } = req.params
  let changes = req.body
  db
    .getById(id)
    .then(comment => {
      db.update(id, changes).then(status => {
        if (status.length >= 1) {
          return res
            .status(200)
            .json({ message: `Task successfully updated.` })
        } else {
          return res
            .status(404)
            .json({ message: 'The requested task does not exist.' })
        }
      })
    })

    .catch(err => {
      res.status(500).json({ message: `Task could not be `, err })
    })
})

// router.put("/:id", async (req, res) => {
//     const { id } = req.params;
  
//     db.get(id).then(comment => {
//       if (!comment) {
//         return res.status(404).json({
//           message: "The comment with the specified ID does not exist."
//         });
//       }
//     });
  
//     try {
//       await db.update(id, comment);
//       let updatedComment = await db.get(id);
//     //   let updatedArray = await db.get();
//       return res.status(200).json({ comment: updatedComment });
//     } catch (err) {
//       res.status(500).json(err.message);
//     }
//   });

  router.post('/', (req, res) => {
    const comment = req.body
    db
      .add(comment)
      .then(comment => {
        res.status(200).json({ message: `comment successfully added` })
      })
      .catch(err => {
        res.status(500).json({ message: `comment could not be added`, err })
      })
  })

// router.post("/", async (req, res) => {
//     let newComment = {
//       text: req.comment.text,
//       email: req.comment.email,
//       profilePicture: req.comment.picture
//     };
//     //add to the database and return updated array of users
//     try {
//       let newComment = db.add(newComment);
//       let updatedArray = db.get();
//       return res.status(201).json({
//         id: newComment.id,
//         name: newComment.name,
//         users: updatedArray
//       });
//     } catch (err) {
//       res.status(500).json(err.message);
//     }
//   });
  module.exports = router;





// ~~~~ REFERENCE ~~~~


// // Create and Save a new Comment
// router.get = ( (req, res) => {
//     // Validate request
//     if(!req.body.content) {
//         return res.status(400).send({
//             message: "Comment content can not be empty"
//         });
//     }

//     // Create a Comment
//     const comment = new Comment({
//         title: req.body.title || "Untitled comment", 
//         content: req.body.content
//     });

//     // Save Comment in the database
//     comment.save()
//     .then(data => {
//         res.send(data);
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while creating the Comment."
//         });
//     });
// });

// // Retrieve and return all comments from the database.
// router.findAll = (req, res) => {
//     Comment.find()
//     .then(comments => {
//         res.send(comments);
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while retrieving comments."
//         });
//     });
// };

// // Find a single comment with a commentId
// router.findOne = (req, res) => {
//     Comment.findById(req.params.commentId)
//     .then(comment => {
//         if(!comment) {
//             return res.status(404).send({
//                 message: "Comment not found with id " + req.params.commentId
//             });            
//         }
//         res.send(comment);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "Comment not found with id " + req.params.commentId
//             });                
//         }
//         return res.status(500).send({
//             message: "Error retrieving commment with id " + req.params.commentId
//         });
//     });
// };

// // Update a comment identified by the commentId in the request
// router.update = (req, res) => {
//     // Validate Request
//     if(!req.body.content) {
//         return res.status(400).send({
//             message: "Comment content can not be empty"
//         });
//     }

//     // Find comment and update it with the request body
//     Comment.findByIdAndUpdate(req.params.commentId, {
//         title: req.body.title || "Untitled Comment",
//         content: req.body.content
//     }, {new: true})
//     .then(comment => {
//         if(!comment) {
//             return res.status(404).send({
//                 message: "Comment not found with id " + req.params.commentId
//             });
//         }
//         res.send(comment);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "Comment not found with id " + req.params.commentId
//             });                
//         }
//         return res.status(500).send({
//             message: "Error updating comment with id " + req.params.commentId
//         });
//     });
// };

// // Delete a comment with the specified commentId in the request
// router.delete = (req, res) => {
//     Comment.findByIdAndRemove(req.params.commentId)
//     .then(comment => {
//         if(!comment) {
//             return res.status(404).send({
//                 message: "Comment not found with id " + req.params.commentId
//             });
//         }
//         res.send({message: "Commnet deleted successfully!"});
//     }).catch(err => {
//         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
//             return res.status(404).send({
//                 message: "Comment not found with id " + req.params.commentId
//             });                
//         }
//         return res.status(500).send({
//             message: "Could not delete comment with id " + req.params.commentId
//         });
//     });
// };

//testing