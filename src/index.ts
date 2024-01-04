import cors from "cors";
import dontevn from "dotenv";
import express from "express";
import i18next from "i18next";
import i18nextFsBackend from "i18next-fs-backend";
import i18nextMiddleware from "i18next-http-middleware";
import { dbConnect } from "./db/config";
import AuthRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";

const app = express();

i18next
  .use(i18nextFsBackend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: __dirname + "/translates/{{lng}}/{{ns}}.json",
    },
    fallbackLng: "es",
    preload: ["es", "en"],
  });
// Variables de Entorno
dontevn.config();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(i18nextMiddleware.handle(i18next));

// Init DB
dbConnect();

// Rutas
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", AuthRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
