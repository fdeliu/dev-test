import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./db.db", (err) => {
  if (err) {
    console.log("DB connection failed!", err);
    return;
  }
});

new Promise((resolve, reject) => {
  console.log("Trying to add data into db.....");

  db.run(
    'INSERT into table1(name, email,phone) values ("flamur deliu","test@gmail.com","0123456789")',
    (err) => {
      if (err) {
        reject(err);
      }
      setTimeout(() => resolve("=======>New entry added successfully"), 2000);
    }
  );
})
  .then((result) => console.log(result))
  .catch((err) => console.log("======>Something went wrong", err.message));

db.close();
