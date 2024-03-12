import express, { Application } from "express";
import volunteersRouter from "./routes/volunteersRoute";
import votersRouter from "./routes/votersRoute";
import firestoreConn from "./db/Firebase";

import * as dotenv from "dotenv";
dotenv.config();

const app: Application = express();
const port = process.env.APP_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// firestoreConn
app.use("/api/volunteers", volunteersRouter);
app.use("/api/voters", votersRouter);

app.listen(port, () => {
  console.log(`${process.env.APP_NAME} is running on port ${port}`);
});
