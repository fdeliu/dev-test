import express from "express";
import cors from "cors";

import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./db.db", (err) => {
  if (err) {
    console.log("DB connection failed!", err);
    return;
  }
  console.log("DB connected");
});

const app = express();

app.use(cors());

import { data } from "./data";

app.get("/data", (req, res) => {
  res.json(data);
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
