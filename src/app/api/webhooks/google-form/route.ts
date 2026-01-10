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

    const formData = {
      formId: body.formId,
      formTitle: body.formTitle,
      responseId: body.responseId,
      timeStamp: body.timeStamp,
      respondentEmail: body.respondentEmail,
      responses: body.responses,
      raw: body,
    };

    await sendWorkflowExecution({
      workflowId,
      initialData: {
        googleForm: formData,
      },
    });

    return NextResponse.json(
      { message: "Google Form webhook processed successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Google Form webhook error:", error);
    return NextResponse.json(
      { error: "Failed to process Google form submission", success: false },
      { status: 500 }
    );
  }
}
