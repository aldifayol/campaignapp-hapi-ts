import express, { Router} from "express"
import firestoreConn from "../db/Firebase";  
import { votersHandler } from "../controllers/votersController";

const votersRouter: Router = express.Router();

votersRouter.use(express.json())
votersRouter.use(express.urlencoded({extended: true}))
firestoreConn

votersRouter.post("/", votersHandler.createHandler);
votersRouter.get("/", votersHandler.getHandler);
votersRouter.get("/:id", votersHandler.getByIDHandler)
votersRouter.put("/:id", votersHandler.updateHandler);
votersRouter.delete("/:id", votersHandler.deleteHandler);

export default votersRouter;