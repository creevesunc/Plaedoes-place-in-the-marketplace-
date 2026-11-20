export type PayoutEligibilityInput = {
  orderStatus: string;
  hasOpenDispute: boolean;
  sellerChargesEnabled: boolean;
  sellerPayoutsEnabled: boolean;
  trackingProvided: boolean;
  deliveredAt: Date | null;
  payoutHoldDays: number;
  now?: Date;
};

export type PayoutEligibilityResult = {
  eligible: boolean;
  reason: string;
};

export function evaluatePayoutEligibility(
  input: PayoutEligibilityInput
): PayoutEligibilityResult {
  const now = input.now ?? new Date();

  if (input.hasOpenDispute || input.orderStatus === "DISPUTED") {
    return {
      eligible: false,
      reason: "Payout is on hold due to an active dispute.",
    };
  }

  if (!["PAID", "SHIPPED", "DELIVERED", "COMPLETED"].includes(input.orderStatus)) {
    return {
      eligible: false,
      reason: "Order payment is not confirmed.",
    };
  }

  if (!input.sellerChargesEnabled || !input.sellerPayoutsEnabled) {
    return {
      eligible: false,
      reason: "Seller Stripe Connect onboarding is incomplete.",
    };
  }

  if (!input.trackingProvided) {
    return {
      eligible: false,
      reason: "Shipment tracking information has not been recorded yet.",
    };
  }

  if (input.deliveredAt) {
    const holdMillis = Math.max(0, input.payoutHoldDays) * 24 * 60 * 60 * 1000;
    const eligibleAt = new Date(input.deliveredAt.getTime() + holdMillis);
    if (now < eligibleAt) {
      return {
        eligible: false,
        reason: `Payout is within the ${input.payoutHoldDays}-day post-delivery protection window.`,
      };
    }
    return {
      eligible: true,
      reason: "All payout protection conditions and post-delivery hold period are satisfied.",
    };
  }

  if (input.orderStatus === "COMPLETED") {
    return {
      eligible: true,
      reason: "Order is completed and all payout protection checks passed.",
    };
  }

  return {
    eligible: false,
    reason: "Awaiting delivery confirmation or completion of buyer protection window.",
  };
}
