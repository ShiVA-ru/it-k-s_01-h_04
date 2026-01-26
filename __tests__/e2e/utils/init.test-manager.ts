import config from "../../../src/core/settings/config";
import { runDB } from "../../../src/db/mongo";
import { setupApp } from "../../../src/setup-app";
import express from "express";

export const initTestManager = {
  async initApp() {
    const app = express();
    setupApp(app);

    await runDB(config.mongoUrl);

    return app;
  },
};
