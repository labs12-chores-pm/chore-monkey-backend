
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('groups').del()
    .then(function () {
      // Inserts seed entries
      return knex('groups').insert([
        {id: 1, creatorId: 1, name: "Asgard castle rooms", token: null },
        {id: 2, creatorId: 1, name: "Asgard gardens", token: null },
        {id: 3, creatorId: 2, name: "Stark Equipment Maintenance", token: null },
        {id: 4, creatorId: 3, name: "PR with Americans", token: null }
      ]);
    });
};
