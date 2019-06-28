exports.up = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("tasks")

    .createTable("tasks", table => {
      table.increments("id");
      table.string("title", 255).notNullable();
      table
        .string("assignedTo")
        .references("userId")
        .inTable("groupMembers")
        .onDelete("CASCADE");
      table
        .integer("groupId")
        .references("id")
        .inTable("groups")
        .onDelete("CASCADE")
        .notNullable();
      table.boolean("isComplete").defaultTo(false);
      table.string("description");
      table.date("dueDate");

      table
        .biginteger("listId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("lists")
        .onDelete("CASCADE")
        .index();
      table.timestamp("createdAt").defaultTo(knex.fn.now());
      table.timestamp("updatedAt").defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("tasks");
};
