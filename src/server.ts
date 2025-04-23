import express from "express";
import UserRoutes from "./routes/UserRoutes"
import TaskRoutes from "./routes/TaskRoutes"
import cors from "cors";
import { AppDataSource } from "./dataSource";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", UserRoutes);
app.use("/api", TaskRoutes)

AppDataSource.initialize().then(() => {
  app.listen(3306, () => console.log("Server is running on port 3306"));
}).catch((error) => {
  console.log("Erro ao conectar ao banco de dados!", error)
});