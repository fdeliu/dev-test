import express from "express";

const app = express();

import { data } from "./data";

app.get("/data", (req, res) => {
  res.json(data);
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
