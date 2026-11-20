import { describe, expect, it } from "vitest";
import { evaluatePayoutEligibility } from "./payout-eligibility";

describe("evaluatePayoutEligibility", () => {
  it("blocks payout when there is an open dispute", () => {
    const res = evaluatePayoutEligibility({
      orderStatus: "DELIVERED",
      hasOpenDispute: true,
      sellerChargesEnabled: true,
      sellerPayoutsEnabled: true,
      trackingProvided: true,
      deliveredAt: new Date("2026-10-01T00:00:00Z"),
      payoutHoldDays: 7,
      now: new Date("2026-10-20T00:00:00Z"),
    });
    expect(res.eligible).toBe(false);
  });

  it("blocks payout before tracking is recorded", () => {
    const res = evaluatePayoutEligibility({
      orderStatus: "PAID",
      hasOpenDispute: false,
      sellerChargesEnabled: true,
      sellerPayoutsEnabled: true,
      trackingProvided: false,
      deliveredAt: null,
      payoutHoldDays: 7,
    });
    expect(res.eligible).toBe(false);
  });

  it("blocks payout while inside post-delivery protection window", () => {
    const deliveredAt = new Date("2026-11-18T12:00:00Z");
    const now = new Date("2026-11-20T12:00:00Z");
    const res = evaluatePayoutEligibility({
      orderStatus: "DELIVERED",
      hasOpenDispute: false,
      sellerChargesEnabled: true,
      sellerPayoutsEnabled: true,
      trackingProvided: true,
      deliveredAt,
      payoutHoldDays: 7,
      now,
    });
    expect(res.eligible).toBe(false);
  });

  it("allows payout once eligible after hold window with no disputes", () => {
    const deliveredAt = new Date("2026-11-01T12:00:00Z");
    const now = new Date("2026-11-20T12:00:00Z");
    const res = evaluatePayoutEligibility({
      orderStatus: "DELIVERED",
      hasOpenDispute: false,
      sellerChargesEnabled: true,
      sellerPayoutsEnabled: true,
      trackingProvided: true,
      deliveredAt,
      payoutHoldDays: 7,
      now,
    });
    expect(res.eligible).toBe(true);
  });
});
