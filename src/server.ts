import express from "express";
import UserRoutes from "./routes/UserRoutes"
import TaskRoutes from "./routes/TaskRoutes"


const app = express();
app.use(express.json());

// Usar as rotas
app.use("/api", UserRoutes);
app.use("/api", TaskRoutes);



// Iniciar o servidor
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
