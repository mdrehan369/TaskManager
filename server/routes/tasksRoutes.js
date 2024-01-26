import express from "express";
import { getTaskController, updateTaskController, deleteTaskController, addTaskController } from "../contollers/index.js"
import { checkToken } from "../middlewares/checkToken.js";

let router = express.Router();

router.use(checkToken);

router.get("/api/getTasks/:username", getTaskController);

router.post("/api/addtask", addTaskController);

router.post("/api/update", updateTaskController)

router.get("/api/delete/:id", deleteTaskController);

export default router;
