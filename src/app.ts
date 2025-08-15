import { failedResponse } from "./utils/api.ts";
import { FRONTEND_ORIGIN } from "./constants.ts";
import type { Request, Response, NextFunction } from "express";

import logger from "./plugins/logger.ts";
import helmet from 'helmet'
import compression from 'compression'
import path from "path";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import auth from "./middlewares/auth.ts";

const app = express();

// static files
app.use("/public", express.static(path.join(path.resolve(), "public")));

app.use(logger()) // request logger
app.use(helmet()) // add security headers
app.use(compression()) // asset compression (except image)

// plugins
app.use(bodyParser.json());

app.use(
  cors({
    credentials: true,
    origin: FRONTEND_ORIGIN,
  })
);

app.use(auth);

// error handling
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  failedResponse(res, error);
});

export default app;
