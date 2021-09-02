const sqlite3 = require('sqlite3').verbose();

let db
exports.db = db

exports.open = function (path) {
    return new Promise(function (resolve, reject) {
        this.db = new sqlite3.Database(path, (err) => {
            if (err) reject(err.message)
            resolve('Connected to the startop database.')
        })
    })
}

exports.all = function (query) {
    return new Promise(function (resolve, reject) {
        this.db.all(query, [], (err, rows) => {
            if (err) reject(err.message)
            resolve(rows);
        });
    });
}

module.exports.closeDB = function () {
    return new Promise(function (resolve, reject) {
        this.db.close((err) => {
            if (err) reject(err.message)
            console.log('Close the database connection.')
        })
    })
}

// exports.getDatas = function (db, query) {
//     db.all("SELECT * FROM api_startop", [], (err, rows) => {
//         if (err) {
//             console.error(err.message);
//             return;
//         }
//         // console.log(rows);
//         // return rows;
//         return rows;
//     });
// }

// exports.getDatas = function (db, query) {
//     let datas = [];
//     db.serialize(async () => {
//         await db.each(query, (err, row) => {
//             if (err) {
//                 console.error(err.message);
//             }
//             datas.push({
//                 title: row.title,
//                 description: row.description,
//             })
//         });
//     });
//     console.log(datas);
//     // setTimeout(() => {
//     //     console.log(datas)
//     // }, 1000);
//     return datas;
// }