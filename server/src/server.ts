import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

import { data } from "./data";

app.get("/data", (req, res) => {
  res.json(data);
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
