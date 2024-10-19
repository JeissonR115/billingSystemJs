import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./src/routes/index.js";
import connectToDatabase from "./src/config/database.js";

dotenv.config();

const app = express();

// Configuración de CORS
app.use(cors());

const { PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
app.use(express.json());
app.use("/v1", routes);

export const db = await connectToDatabase({ DB_HOST, DB_USER, DB_PASSWORD, DB_NAME });

app.listen(PORT, () => {
  console.log(
    `Server is running on port http://${DB_HOST || "localhost"}:${PORT || 3300}`
  );
});
