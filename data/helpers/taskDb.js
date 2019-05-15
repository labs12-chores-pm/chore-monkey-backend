const db = require("../config");



// Export functions
module.exports = {
  get,
  getByGroup,
  getByUser,
  getById,
  add,
  update,
  remove
}

function get() {
  return db('tasks')
}

function getByGroup(groupId) {
  return db
    .select('*')
    .from('tasks')
    .where('groupID', groupId)
}

function getByUser(userId) {
  return db
    .select('*')
    .from('tasks')
    .where('purchasedBy', userId)
}

function getById(id) {
  return db
    .select('*')
    .from('tasks')
    .where({ id })
}

function add(task) {
  return db('tasks')
    .returning('id')
    .insert(task)
    .into('tasks')
}

function update(id, changes) {
  return db('tasks')
    .returning('id')
    .where({ id })
    .update(changes)
}

function remove(id) {
  return db('tasks')
    .returning('id')
    .where({ id })
    .del()
}