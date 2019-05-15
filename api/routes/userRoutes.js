const express = require("express");
const router = express.Router({ mergeParams: true });
const db = require("../../data/helpers/userDb");

const nodemailer = require("nodemailer");

// *** GET ALL ** //
router.get("/", (req, res) => {
  db.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json(err.message));
});

// *** GET BY ID ** //
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
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
    let user = await db.get(id);
    if (!user) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
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

//updates the user and returns the updated array of users
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  db.get(id).then(user => {
    if (!user) {
      return res.status(404).json({
        message: "The user with the specified ID does not exist."
      });
    }
  });

  try {
    await db.update(id, user);
    let updatedUser = await db.get(id);
    let updatedArray = await db.get();
    return res.status(200).json({ user: updatedUser, users: updatedArray });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// *** CREATE NEW USER ** //

// router.get("/check/getid", (req, res) => {
//   let { email } = req.user;
//   db.getIdByEmail(email)
//     .then(id => {
//       if (!id || id.length === 0) {
//         //create new user
//         let newUser = {
//           name: req.user.name,
//           email: req.user.email,
//           profilePicture: req.user.picture
//         };

//         // send welcome email
//         let transporter = nodemailer.createTransport({
//           service: process.env.EMAIL_SERVICE,
//           auth: {
//             user: process.env.EMAIL_ADDRESS,
//             pass: process.env.EMAIL_PASSWORD
//           }
//         });
//         let mailOptions = {
//           from: process.env.EMAIL_ADDRESS,
//           to: newUser.email,
//           subject: "Welcome to ShopTrak!",
//           text: `Thank you for using ShopTrak. The Lambda Labs 10 Shopping List team hopes you enjoy it.`
//         };
//         transporter.sendMail(mailOptions, function(error, info) {
//           if (error) {
//             console.log(error);
//           } else {
//             console.log(`Email sent: ${info.response}`);
//           }
//         });

//         return db
//           .add(newUser)
//           .then(id => {
//             return db
//               .getById(id)
//               .then(profile => {
//                 return res.status(201).json({
//                   message: `New user added with ID ${id}.`,
//                   profile: profile[0],
//                   id: id[0]
//                 });
//               })
//               .catch(err => {
//                 console.log(err);
//                 return res
//                   .status(404)
//                   .json({ error: `Error addind user/no user found.` });
//               });
//           })
//           .catch(err => {
//             console.log(err);
//             return res
//               .status(404)
//               .json({ error: `Error adding user/no user found.` });
//           });
//       } else {
//         db.getById(id[0].id)
//           .then(profile => {
//             return res.status(200).json({ profile: profile[0], id: id[0].id });
//           })
//           .catch(err => {
//             console.log(err);
//             return res.status(404).json({ error: `Nothing here.` });
//           });
//       }
//     })
//     .catch(err => {
//       console.log(err);
//       return res.status(500).json({ error: `Error retrieving user ID.` });
//     });
// });
router.post("/", async (req, res) => {
  let newUser = {
    name: req.user.name,
    email: req.user.email,
    profilePicture: req.user.picture
  };
  //add to the database and return updated array of users
  try {
    let newUser = db.add(newUser);
    let updatedArray = db.get();
    return res.status(201).json({
      id: newuser.id,
      name: newUser.name,
      users: updatedArray
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});
module.exports = router;
