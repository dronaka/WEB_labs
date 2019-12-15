const sqlite = require('sqlite3').verbose();

const DATABASE_SOURCE = 'db.sqlite';


const CREATE_TABLE_FAVOURITES = `
    CREATE TABLE favourites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name text UNIQUE NOT NULL
    );
`;

let db = new sqlite.Database(DATABASE_SOURCE, (err) => {
    if (err) {
        console.error("Can't open database. Close app");
        throw err;
    }

    console.log('Connected to the SQlite database.');
    db.run(CREATE_TABLE_FAVOURITES, (err) => {
        if (err) {
            console.log("Tables already exist");
        } else {
            console.log("Tables were created");
        }
    });
});


module.exports = db;