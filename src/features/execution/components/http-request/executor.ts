import type { NodeExecutor } from "@/features/execution/types";
import { NonRetriableError } from "inngest";
import ky, { type Options as KyOptions } from "ky";

type HTTPRequestData = {
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: string;
};

export const httpRequestTriggerExecutor: NodeExecutor<
  HTTPRequestData
> = async ({ data, nodeId, context, step }) => {
  if (!data.endpoint) {
    throw new NonRetriableError("HTTP Request node: No endpoint configured");
  }

  // const result = await step.fetch(data.endpoint);

  const result = await step.run("http-trigger", async () => {
    const method = data.method || "GET";
    const endpoint = data.endpoint!;

    const options: KyOptions = { method };

    if (["POST", "PATCH", "PUT"].includes(method)) {
      options.body = data.body;
    }

    const response = await ky(endpoint, options);
    const contentType = response.headers.get("content-type");
    const responseData = contentType?.includes("application/json")
      ? await response.json()
      : await response.text();

    return {
      ...context,
      httpResponse: {
        status: response.status,
        statusText: response.statusText,
        data: responseData,
      },
    };
  });

  return result;
};
