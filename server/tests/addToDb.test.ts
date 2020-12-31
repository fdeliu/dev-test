import test from "tape";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./db.db", (err) => {
  if (err) {
    console.log("DB connection failed!", err);
    return;
  }
  console.log("Db connected");
});

function addToDB() {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT into table2 (name, email,phone) values ("John","John@gmail.com","0123456789")',
      (err) => {
        if (err) {
          reject(err);
        }
        resolve("success");
      }
    );
  });
}

test("should insert data into db", function (t) {
  addToDB().then((res) => {
    var actual = res;
    var expected = "success";

    t.equal(actual, expected);
    t.end();
  });
});
