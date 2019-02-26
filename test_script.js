const pg = require("pg");
const settings = require("./settings");

const searchName = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const query = `SELECT
                CONCAT(first_name, ' ', last_name) as full_name
                , to_char(birthdate, 'YYYY-MM-DD') as birthdate
                FROM famous_people
                WHERE first_name = '${ searchName }'`;

function queries(query, callback) {
  client.connect();
  client.query(query, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      callback(res.rows);
    }
  })
}

function printResult(res) {
  console.log(`Searching ...\nFound ${ res.length } person(s) by the name ${ searchName }:`);
  res.forEach( function(element, index) {
  console.log(`- ${ index + 1 }: ${ element.full_name }, born '${ element.birthdate }'`);
    });
  client.end();
}

queries(query, printResult);