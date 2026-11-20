export type MarketplaceFeeBreakdown = {
  merchandiseSubtotalCents: number;
  commissionRate: number;
  shippingHandlingInsuranceRate: number;
  marketplaceCommissionCents: number;
  shippingHandlingInsuranceCents: number;
  totalMarketplaceFeesCents: number;
  sellerProceedsCents: number;
};

export function calculateMarketplaceFees(
  merchandiseSubtotalCents: number,
  commissionRate = 0.05,
  shippingHandlingInsuranceRate = 0.05
): MarketplaceFeeBreakdown {
  if (!Number.isInteger(merchandiseSubtotalCents) || merchandiseSubtotalCents < 0) {
    throw new Error("merchandiseSubtotalCents must be a non-negative integer.");
  }

  if (
    !Number.isFinite(commissionRate) ||
    commissionRate < 0 ||
    commissionRate > 1 ||
    !Number.isFinite(shippingHandlingInsuranceRate) ||
    shippingHandlingInsuranceRate < 0 ||
    shippingHandlingInsuranceRate > 1
  ) {
    throw new Error("Fee rates must be between 0 and 1.");
  }

  if (commissionRate + shippingHandlingInsuranceRate > 1) {
    throw new Error("Combined fee rates cannot exceed 100%.");
  }

  const marketplaceCommissionCents = Math.round(merchandiseSubtotalCents * commissionRate);
  const shippingHandlingInsuranceCents = Math.round(
    merchandiseSubtotalCents * shippingHandlingInsuranceRate
  );
  const totalMarketplaceFeesCents =
    marketplaceCommissionCents + shippingHandlingInsuranceCents;
  const sellerProceedsCents = Math.max(
    0,
    merchandiseSubtotalCents - totalMarketplaceFeesCents
  );

  return {
    merchandiseSubtotalCents,
    commissionRate,
    shippingHandlingInsuranceRate,
    marketplaceCommissionCents,
    shippingHandlingInsuranceCents,
    totalMarketplaceFeesCents,
    sellerProceedsCents,
  };
}

export function formatCentsToUsd(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}
