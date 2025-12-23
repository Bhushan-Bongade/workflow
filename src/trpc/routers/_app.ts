import { createTRPCRouter } from "../init";

import { workflowsRouter } from "@/features/workflows/server/routers";
import { credentialsRouter } from "@/features/credentials/server/router";
import { executionsRouter } from "@/features/execution/server/router";

export const appRouter = createTRPCRouter({
  workflows: workflowsRouter,
  credentials: credentialsRouter,
  executions: executionsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
