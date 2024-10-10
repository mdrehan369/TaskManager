import express from "express";
import connect from "./lib/connectDB.js";
import bodyParser from "body-parser";
import "dotenv/config";
import taskRouter from "./routes/tasksRoutes.js";
import { signupController, loginController, getUserController } from "./contollers/index.js"
import { checkToken } from "./middlewares/checkToken.js";
import { createTable } from "./AWSConfig.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;
app.use(cors());

connect(process.env.MONGO_URL);

createTable();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.post("/api/signup", signupController);
app.post("/api/login", loginController);
app.get("/api/getUser", checkToken, getUserController);

app.use(taskRouter);

// Added comments

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
