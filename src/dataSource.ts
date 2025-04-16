<<<<<<< HEAD
import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_NAME,  
  port: Number(process.env.DB_PORT), 
  username: process.env.DB_USER,  
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["src/models/*.ts"],
  synchronize: true,
  logging: false, 
});
=======
>>>>>>> c5db97da42aee98d0bbf294caa64a564c5de95b4
