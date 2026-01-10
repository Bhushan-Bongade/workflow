import { sendWorkflowExecution } from "@/inngest/utils";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const workflowId = url.searchParams.get("workflowId");
    if (!workflowId) {
      return NextResponse.json(
        { error: "Missing workflowId parameter", success: false },
        { status: 400 }
      );
    }

    const body = await req.json();

    const stripeData = {
      eventId: body.id,
      eventType: body.type,
      timestamp: body.timestamp,
      raw: body.data?.object,
    };

    await sendWorkflowExecution({
      workflowId,
      initialData: {
        stripe: stripeData,
      },
    });

    return NextResponse.json(
      { message: "Stripe webhook processed successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Stripe webhook error:", error);
    return NextResponse.json(
      { error: "Failed to process Stripe webhook ", success: false },
      { status: 500 }
    );
  }
}
