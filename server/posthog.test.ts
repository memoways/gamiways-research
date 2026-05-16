/**
 * Vitest: validate PostHog API key is configured and reachable.
 * Uses the ping procedure from the postHogRouter.
 */
import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("posthog.ping", () => {
  it("returns ok:true when POSTHOG_API_KEY is set and PostHog is reachable", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.posthog.ping();

    // The key must be configured
    expect(result.ok).toBe(true);
  }, 15_000); // allow 15s for network call
});
