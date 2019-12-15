const db = require('./database');

const AddCity = async (cityname) => {
    return new Promise((resolve) => {
        db.run('INSERT INTO favourites (name) VALUES (?)', [cityname], (err) => {
            if (!err) {
                console.log(`Added city_name = ${cityname}`)
            }

            resolve(!err);
        });
    });
};

const DeleteCity = async (cityname) => {
    return new Promise((resolve) => {
        db.run('DELETE FROM favourites WHERE name = ?', [cityname], (err) => {
            if (!err) {
                console.log(`Removed city_name = ${cityname}`)
            }

            resolve(!err);
        });
    });
};

const GetAllCities = () => {
    return new Promise((resolve) => {
        db.all('SELECT name FROM favourites', (err, rows) => {
            resolve(err ? [] : rows);
        });
    });
};


module.exports = {
    AddCity: AddCity,
    DeleteCity: DeleteCity,
    GetAllCities: GetAllCities
};