// Minimal json-server configuration for message storage
import fs from "fs";
import path from "path";
import { create, router as _router, defaults, bodyParser } from "json-server";

const server = create();
const router = _router("db.json");
const middlewares = defaults();

// Use default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom body parser with limit
server.use(bodyParser);

// Use default router
server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`json-server is running on http://localhost:${PORT}`);
});
