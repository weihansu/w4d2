const settings = require("./settings");

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: settings.hostname,
      user: settings.user,
      password: settings.password,
      database: settings.database,
      charset: 'utf8'
    }
  },

  staging: {
    client: 'pg',
    connection: {
      database: settings.database,
      user:     settings.user,
      password: settings.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      database: settings.database,
      user:     settings.user,
      password: settings.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
