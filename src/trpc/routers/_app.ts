import { inngest } from "@/inngest/client";
import { protectedProcedure, baseProcedure, createTRPCRouter } from "../init";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import prisma from "@/lib/db";

export const appRouter = createTRPCRouter({
  testAi: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "execute/ai",
    });

    return { success: true, message: "job queued" };
  }),
  getWorkflows: protectedProcedure.query(async ({ ctx }) => {
    return await prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async ({ ctx }) => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "m@example.com",
      },
    });

    return await prisma.workflow.create({
      data: {
        name: "test-workflow",
      },
    });
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
