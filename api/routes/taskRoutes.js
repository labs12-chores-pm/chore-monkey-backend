const express = require('express')
const taskRouter = express.Router()
const taskDb = require('../../data/helpers/taskDb')

// const checkJwt = require('../../validators/checkJwt')
// const checkUser = require('../../validators/checkUser')
// checkJwt middleware authenticates user tokens and ensures they are signed correctly in order to access our internal API
const moment = require('moment')




// taskRouter.use(checkJwt)

// ADD Task //

taskRouter.post('/', (req, res) => {
  const task = req.body
  taskDb
    .add(task)
    .then(id => {
      res.status(200).json({ message: `Task successfully added`, id: id[0] })
    })
    .catch(err => {
      res.status(500).json({ message: `Task could not be added`, err })
    })
})


// GET TASK BY ID //

taskRouter.get('/:id', (req, res) => {
  const { id } = req.params
  taskDb
    .getById(id)
    .then(task => {
      if (task.length >= 1) {
        return res.status(200).json({ data: task })
      } else {
        return res.status(404).json({ message: 'The requested task does not exist.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: `Task could not be retrieved`, err })
    })
})


// GET TASK BY GROUP ID //

taskRouter.get('/group/:id', (req, res) => {
  const { id } = req.params

  taskDb
    .getByGroup(id)
    .then(task => {
      if (task.length >= 1) {
        return res.status(200).json({ data: task })
      }
      return res
        .status(404)
        .json({ message: 'The requested task does not exist.' })
    })
    .catch(err => {
      res.status(500).json({ message: `Task could not be retrived`, err })
    })
})


// GET ALL TASKS //

taskRouter.get('/', (req, res) => {
  taskDb
    .get()
    .then(tasks => {
      if (tasks.length >= 1) {
        return res.status(200).json({ data: tasks })
      }
      return res
        .status(404)
        .json({ message: `The requested tasks do not exist.` })
    })
    .catch(err => {
      res.status(500).json({ message: `Tasks could not be retrieved`, err })
    })
})





// UPDATE TASK //

taskRouter.put('/:id', (req, res) => {
  let { id } = req.params
  let changes = req.body
  taskDb
    .getById(id)
    .then(task => {
      taskDb.update(id, changes).then(status => {
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

// DELETE A TASK //

taskRouter.delete('/:id', (req, res) => {
  const { id } = req.params

  taskDb
    .remove(id)
    .then(status => {
      if (status.length >= 1) {
        return res
          .status(200)
          .json({ message: `Task successfully deleted.` })
      } else {
        return res
          .status(404)
          .json({ error: `The requested task does not exist.` })
      }
    })
    .catch(err => {
      res.status(500).json({ message: `Task could not be deleted`, err })
    })
})




module.exports = taskRouter











