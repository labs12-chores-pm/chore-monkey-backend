
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {id: 1, text: 'a comment here', memberId: 1, taskId: 6},
        {id: 2, text: 'a comment here', memberId: 2, taskId: 7},
        {id: 3, text: 'a comment here', memberId: 3, taskId: 8},
        {id: 4, text: 'a comment here', memberId: 4, taskId: 9},
      ]);
    });
};
