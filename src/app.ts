import { failedResponse } from "./utils/api.ts";
import { FRONTEND_ORIGIN } from "./constants.ts";
import type { Request, Response, NextFunction } from "express";
import graphqlSchema from "./graphql/schema.ts";
import graphqlResolvers from "./graphql/resolvers.ts";

import path from "path";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createHandler } from "graphql-http/lib/use/express";
import { getErrorResponse } from "./utils/error.ts";

const app = express();

// static files
app.use("/public", express.static(path.join(path.resolve(), "public")));

// plugins
app.use(bodyParser.json());

app.use(
  cors({
    credentials: true,
    origin: FRONTEND_ORIGIN,
  })
);

app.all(
  "/graphql",
  createHandler({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
    formatError: (err: any) => getErrorResponse(err),
  })
);

// error handling
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  failedResponse(res, error);
});

export default app;
