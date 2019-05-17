
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('groupMembers').del()
    .then(function () {
      // Inserts seed entries
      return knex('groupMembers').insert([
        {id: 1, userId: 4, groupId: 1 },
        {id: 2, userId: 4, groupId: 3 },
        {id: 3, userId: 4, groupId: 4 },
        {id: 4, userId: 3, groupId: 2 },
        {id: 5, userId: 3, groupId: 4 },
        {id: 6, userId: 2, groupId: 2 },
        {id: 7, userId: 2, groupId: 3 },
        {id: 8, userId: 1, groupId: 1 },
        {id: 9, userId: 1, groupId: 2 },
        {id: 10, userId: 1, groupId: 4 },
      ]);
    });
};
