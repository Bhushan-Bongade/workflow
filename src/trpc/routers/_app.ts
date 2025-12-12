import { inngest } from "@/inngest/client";
import {
  protectedProcedure,
  baseProcedure,
  createTRPCRouter,
  premiumProcedure,
} from "../init";

import { workflowsRouter } from "@/features/workflows/server/routers";

export const appRouter = createTRPCRouter({
  workflows: workflowsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
