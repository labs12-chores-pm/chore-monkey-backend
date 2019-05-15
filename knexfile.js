require("dotenv").config();
var localPg = require("pg");

localPg = {
  host: "localhost",
  database: 'api',
  user: 'ryan',
  password: 'pass',
  port: 5432,
  defaults: {
    ssl: true
  }
};
const dbConnection = process.env.DATABASE_URL || localPg;

module.exports = {
  development: {
    client: "pg",
    connection: localPg,
    useNullAsDefault: true,
    migrations: {
      tableName: "knex_migrations",
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  production: {
    client: "pg",
    connection: dbConnection + "?ssl=true",
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./data/migrations"
    },
    seeds: { directory: "./data/seeds" }
  }
};
