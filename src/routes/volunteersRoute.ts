import express, { ErrorRequestHandler, Request, Response, Router } from "express"
import admin from "firebase-admin"
import firestoreConn from "../db/Firebase";  
import { volunteersHandler } from "../controllers/volunteersController";

// VOLUNTEERS Routes Setup
const volunteersRouter: Router = express.Router();

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {}

volunteersRouter.use(errorHandler) //

volunteersRouter.use(express.json())
volunteersRouter.use(express.urlencoded({extended: true}))

firestoreConn;

volunteersRouter.post("/", volunteersHandler.createHandler)
volunteersRouter.get("/", volunteersHandler.getHandler);
volunteersRouter.get("/:id", volunteersHandler.getByIDHandler);
volunteersRouter.put("/:id", volunteersHandler.updateHandler);
volunteersRouter.delete("/:id", volunteersHandler.deleteHandler);

export default volunteersRouter;

