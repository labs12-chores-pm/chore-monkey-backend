exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("subscriptions")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("subscriptions").insert([
        { id: 1, name: "Free", price: 0.0 },
        { id: 2, name: "Premium", price: 9 }
      ]);
    });
};
