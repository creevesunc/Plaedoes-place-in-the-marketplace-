export type MarketplaceFeeCalculation = {
  merchandiseSubtotalCents: number;
  marketplaceCommissionRate: number;
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
): MarketplaceFeeCalculation {
  if (!Number.isInteger(merchandiseSubtotalCents)) {
    throw new Error("Subtotal must be an integer number of cents.");
  }

  if (merchandiseSubtotalCents < 0) {
    throw new Error("Subtotal cannot be negative.");
  }

  if (
    !Number.isFinite(commissionRate) ||
    !Number.isFinite(shippingHandlingInsuranceRate) ||
    commissionRate < 0 ||
    shippingHandlingInsuranceRate < 0 ||
    commissionRate + shippingHandlingInsuranceRate > 1
  ) {
    throw new Error("Invalid marketplace fee configuration.");
  }

  const commissionCents = Math.round(
    merchandiseSubtotalCents * commissionRate
  );

  const insuranceFeeCents = Math.round(
    merchandiseSubtotalCents * shippingHandlingInsuranceRate
  );

  const totalFeesCents = commissionCents + insuranceFeeCents;
  const sellerProceedsCents = merchandiseSubtotalCents - totalFeesCents;

  return {
    merchandiseSubtotalCents,
    marketplaceCommissionRate: commissionRate,
    shippingHandlingInsuranceRate,
    marketplaceCommissionCents: commissionCents,
    shippingHandlingInsuranceCents: insuranceFeeCents,
    totalMarketplaceFeesCents: totalFeesCents,
    sellerProceedsCents,
  };
}

export function formatCentsToUsd(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}
