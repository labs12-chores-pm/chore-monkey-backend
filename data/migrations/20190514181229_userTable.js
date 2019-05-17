exports.up = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users").createTable("users", table => {
    table.increments("id");
    table
      .string("email", 255)
      .notNullable()
      .unique();
    table.string("name", 255).notNullable();
    table
      .string("profilePicture", 255)
      .defaultTo("https://i.imgur.com/M8kRKQC.png");
    table
      .integer("subscriptionType")
      .references("id")
      .inTable("subscriptions")
    .defaultTo(1);
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
