const settings = require("./settings");

const searchName = process.argv[2];
const query = `SELECT
                CONCAT(first_name, ' ', last_name) as full_name
                , to_char(birthdate, 'YYYY-MM-DD') as birthdate
                FROM famous_people
                WHERE first_name = '${ searchName }'`;

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

let searchRes = knex.raw(query)
                  .then( (result) => {printResult(result.rows)})
                  .catch( (err) => { console.log( err); throw err })
                  .finally(() => { knex.destroy();
                });

function printResult(res) {
  console.log(`Searching ...\nFound ${ res.length } person(s) by the name ${ searchName }:`);
  res.forEach( function(element, index) {
  console.log(`- ${ index + 1 }: ${ element.full_name }, born '${ element.birthdate }'`);
    });

}