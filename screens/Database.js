import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const dbName = 'ikarate.db';
const dbVersion = '1.0';
const dbDisplayName = 'I Karate DB';
const dbSize = '20000';

class Database {

    initDatabase() {
        let db;
        return new Promise((resolve) => {
            SQLite.echoTest().then(() => {
                SQLite.openDatabase(dbName, dbVersion, dbDisplayName, dbSize).then((DB) => {
                    db = DB;
                    db.executeSql('SELECT Id FROM Marks LIMIT 1').catch((error) => {
                        db.transaction((tx) => {
                            tx.executeSql('CREATE TABLE IF NOT EXISTS Marks (' +
                                'Id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                                'Name TEXT, JudgeScore TEXT, FinalScore TEXT,' +
                                'Date DATE, Time TEXT)');
                        }).then((result) => resolve(db));
                    }).then((result) => resolve(db));
                });
            });
        });
    }

    closeDatabase(db) {
        if (db) {
            db.close();
        }
    }

    addMark(mark) {
        return new Promise((resolve) => {
            this.initDatabase().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO Marks (Name,JudgeScore,FinalScore,Date,Time) VALUES(?,?,?,?,?)',
                        [mark.name, mark.judgeScore, mark.finalScore, mark.date, mark.time]).then(([tx, results]) => {
                            resolve(results)
                        });
                }).then((result) => {
                    this.closeDatabase(db);
                });
            });
        });
    }

    readAllMarks() {
        return new Promise((resolve) => {
            const marks = [];
            this.initDatabase().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT Id,Name,JudgeScore,FinalScore FROM Marks', []).then(([tx, result]) => {
                        let len = result.rows.length;
                        for (i = 0; i < len; i++) {
                            let row = result.rows.item(i)
                            marks.push(row);
                        }
                        resolve(marks);
                    });
                }).then(() => { this.closeDatabase(db) });
            });
        });
    }

    deleteMarks(arr) {
        return new Promise((resolve) => {
            this.initDatabase().then((db) => {
                db.transaction((tx) => {
                    arr.forEach((item) => {
                        tx.executeSql('DELETE FROM Marks WHERE Id=' + item, []).then(([tx, result]) => {
                            resolve();
                        });
                    });
               })
            });
        });
    }
}

export default Database;