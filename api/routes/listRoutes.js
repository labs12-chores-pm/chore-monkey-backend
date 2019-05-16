const express = require("express");
const router = express.Router();
const db = require("../../data/helpers/listsDb");

const checkJwt = require("../auth/checkJwt");
// checkJwt middleware authenticates user tokens and ensures they are signed correctly in order to access our internal API

/****************************************************************************************************/
/** THIS ROUTER HANDLES ALL REQUESTS TO THE /api/list ENDPOINT **/
/****************************************************************************************************/

/** ADD GROUP TO DATABASE
 * @param list = {list: "name of the list"}, this is gathered from the @param req.body
 * @return id = list ID primary key in categories table (e.g. 1, 3, 22, etc.);
 * ID is generated upon list creation
 * @param list.list is the name of the list. Not nullable.
 *
 * ***********************************************/

/** ADD list
 * @TODO Add middleware to ensure user is logged in
 * **/
router.post("/", (req, res) => {
  let list = req.body;
  db.add(list)
    .then(id => {
      return res
        .status(200)
        .json({ message: "list successfully added.", id: id[0] });
    })
    .catch(err => {
      const error = {
        message: `Internal Server Error - Adding list`,
        data: {
          err: err
        }
      };
      return res.status(500).json(error);
    });
});

/**************************************************/

/** GET list BY ID
 * @TODO Add middleware to ensure user is logged in
 * **/

/**************************************************/
router.get("/:id", (req, res) => {
  const id = req.params.id;

  db.getById(id)
    .then(cat => {
      if (cat.length >= 1) {
        return res.status(200).json({ data: cat[0] });
      }
      return res
        .status(404)
        .json({ error: `The requested list does not exist.` });
    })
    .catch(err => {
      const error = {
        message: `Internal Server Error`,
        data: {
          err: err
        }
      };
      return res.status(500).json(error);
    });
});

/**************************************************/

/** GET list BY list
 * @TODO Add middleware to ensure user is logged in
 * **/

/**************************************************/
router.get("/:list", (req, res) => {
  const name = req.params.list;

  db.getBylist(name)
    .then(cat => {
      if (cat.length >= 1) {
        return res.status(200).json({ data: cat[0] });
      }
      return res
        .status(404)
        .json({ error: `The requested list does not exist.` });
    })
    .catch(err => {
      const error = {
        message: `Internal Server Error`,
        data: {
          err: err
        }
      };
      return res.status(500).json(error);
    });
});

/**************************************************/

// GET ALL CATEGORIES
/** @TODO This should be set to sysadmin privileges for group privacy **/

/**************************************************/

router.get("/", (req, res) => {
  db.get()
    .then(cats => {
      if (cats.length >= 1) {
        return res.status(200).json({ data: cats });
      }

      return res
        .status(404)
        .json({ message: "The requested categories do not exist." });
    })
    .catch(err => {
      const error = {
        message: `Error collecting list information.`,
        data: {
          err: err
        }
      };
      return res.status(500).json(error);
    });
});

/**************************************************/
/**
 * UPDATE list
 * @TODO Add middleware to ensure users can only change their own group information
 */

/**************************************************/
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  db.update(id, changes)
    .then(status => {
      if (status.length >= 1 || !status) {
        return res
          .status(200)
          .json({ message: `list successfully updated.`, id: Number(id) });
      } else {
        return res
          .status(404)
          .json({ error: `The requested list does not exist.` });
      }
    })
    .catch(err => {
      const error = {
        message: `Error updating list.`,
        data: {
          err: err
        }
      };
      return res.status(500).json(error);
    });
});

/**************************************************/

/** DELETE list
 * @TODO Add middleware to prevent unauthorized deletions
 * **/

/**************************************************/

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(cid => {
      res
        .status(200)
        .json({ message: "list successfully deleted.", id: Number(cid) });
    })
    .catch(err => {
      const error = {
        message: `Error removing list.`,
        data: {
          err: err
        }
      };
      return res.status(500).json(error);
    });
});

module.exports = router;