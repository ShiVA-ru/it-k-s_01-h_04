import express from "express";
import { setupApp } from "./setup-app";
import { runDB } from "./db/mongo";
import config from "./core/settings/config";

const bootstrap = async () => {
  const app = express();
  setupApp(app);

  // порт приложения
  const PORT = config.port;

  await runDB(config.mongoUrl);

  if (process.env.VERCEL !== "1") {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }

  return app;
};

bootstrap();
