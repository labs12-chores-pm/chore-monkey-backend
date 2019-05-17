
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return (function () {
      // Inserts seed entries
      return knex('subscriptions').insert([
        {id: 1, name: 'Free', price: 0 },
        {id: 2, name: 'Pro', price: 9 },
        {id: 3, name: 'Business', price: 9999 }
      ]);
    });
};
