exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("comments")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("comments").insert([
        { id: 1, text: "Top Priority", memberId: 1, taskId: 1 }
        { id: 2, text: "Topper Priority", memberId: 1, taskId: 1 }
      ]);
    });
};
