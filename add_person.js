const settings = require("./settings");
const options = {
    client: 'pg',
    connection: {
        host: settings.hostname,
        user: settings.user,
        password: settings.password,
        database: settings.database,
    }
}

const knex = require('knex')(options);

const famousToInsert = [
    { first_name: 'Aretha', last_name: 'Franklin', birthdate: '1942-03-25' },
    { first_name: 'Stan', last_name: 'Lee', birthdate: '1922-12-25' }
]


knex('famous_people').insert(famousToInsert).then(() => console.log("data inserted"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
    });