const express = require("express");
const router = express.Router();
const db = require("../../data/helpers/groupDb");

router.post("/", (req, res) => {
  let group = req.body;
  db.add(group)
    .then(id => {
      res.status(200).json({ message: "hooray", id });
    })
    .catch(err => {
      res.status(500).json({ message: `group could not be added`, err });
    });
});

// GET ALL groupS //

router.get("/", (req, res) => {
  db.get()
    .then(groups => {
      res.status(200).json(groups);
    })
    .catch(err => res.status(500).json(err.message));
});

// GET groupS By UserID //

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.getByUser(id)
    .then(group => {
      if (group.length >= 1) {
        return res.status(200).json({ data: group });
      } else {
        return res
          .status(404)
          .json({ message: "The requested group does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: `group could not be retrieved`, err });
    });
});

// DELETE A group //

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(status => {
      if (status.length >= 1) {
        return res.status(200).json({ message: `group successfully deleted.` });
      } else {
        return res
          .status(404)
          .json({ error: `The requested group does not exist.` });
      }
    })
    .catch(err => {
      res.status(500).json({ message: `group could not be deleted`, err });
    });
});

// UPDATE A group//

router.put("/:id", (req, res) => {
  let { id } = req.params;
  let changes = req.body;
  db.getById(id)
    .then(group => {
      db.update(id, changes).then(status => {
        if (status.length >= 1) {
          return res
            .status(200)
            .json({ message: `group successfully updated.` });
        } else {
          return res
            .status(404)
            .json({ message: "The requested group does not exist." });
        }
      });
    })

    .catch(err => {
      res.status(500).json({ message: `group could not be updated`, err });
    });
});

module.exports = router;
