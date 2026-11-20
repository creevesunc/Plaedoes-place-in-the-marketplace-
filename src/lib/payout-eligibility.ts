export type PayoutEligibilityInput = {
  orderStatus: "PENDING_PAYMENT" | "PAID" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "COMPLETED" | "CANCELLED" | "REFUNDED" | "DISPUTED";
  hasOpenDispute: boolean;
  sellerChargesEnabled: boolean;
  sellerPayoutsEnabled: boolean;
  trackingProvided: boolean;
  deliveredAt: Date | null;
  payoutHoldDays: number;
  now?: Date;
};

export function evaluatePayoutEligibility(input: PayoutEligibilityInput): {
  eligible: boolean;
  reason: string;
} {
  const now = input.now ?? new Date();

  if (input.hasOpenDispute || input.orderStatus === "DISPUTED") {
    return { eligible: false, reason: "Order has an active dispute hold." };
  }

  if (!["PAID", "PROCESSING", "SHIPPED", "DELIVERED", "COMPLETED"].includes(input.orderStatus)) {
    return { eligible: false, reason: "Order payment is not in a releasable state." };
  }

  if (!input.sellerChargesEnabled || !input.sellerPayoutsEnabled) {
    return { eligible: false, reason: "Seller Stripe Connect account is not fully enabled for payouts." };
  }

  if (!input.trackingProvided) {
    return { eligible: false, reason: "Shipment tracking information is required before payout release." };
  }

  if (!input.deliveredAt) {
    return { eligible: false, reason: "Delivery confirmation is required before protection window completes." };
  }

  const holdMs = Math.max(0, input.payoutHoldDays) * 24 * 60 * 60 * 1000;
  const eligibleAt = new Date(input.deliveredAt.getTime() + holdMs);

  if (now < eligibleAt) {
    return {
      eligible: false,
      reason: `Protection window active until ${eligibleAt.toISOString()}.`,
    };
  }

  return { eligible: true, reason: "All marketplace release conditions met." };
}
