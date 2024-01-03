import cors from "cors";
import dontevn from "dotenv";
import express from "express";
import { dbConnect } from "./db/config";
import AuthRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
const app = express();

// Variables de Entorno
dontevn.config();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: false }));

// Init DB
dbConnect();

// Rutas

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", AuthRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
