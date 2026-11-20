import { describe, expect, it } from "vitest";
import { calculateMarketplaceFees } from "./fees";

describe("calculateMarketplaceFees", () => {
  it("calculates $0.00 accurately", () => {
    const res = calculateMarketplaceFees(0);
    expect(res.marketplaceCommissionCents).toBe(0);
    expect(res.shippingHandlingInsuranceCents).toBe(0);
    expect(res.totalMarketplaceFeesCents).toBe(0);
    expect(res.sellerProceedsCents).toBe(0);
  });

  it("calculates $1.00 (100 cents) accurately", () => {
    const res = calculateMarketplaceFees(100);
    expect(res.marketplaceCommissionCents).toBe(5);
    expect(res.shippingHandlingInsuranceCents).toBe(5);
    expect(res.totalMarketplaceFeesCents).toBe(10);
    expect(res.sellerProceedsCents).toBe(90);
  });

  it("calculates $10.00 (1000 cents) accurately", () => {
    const res = calculateMarketplaceFees(1000);
    expect(res.marketplaceCommissionCents).toBe(50);
    expect(res.shippingHandlingInsuranceCents).toBe(50);
    expect(res.totalMarketplaceFeesCents).toBe(100);
    expect(res.sellerProceedsCents).toBe(900);
  });

  it("calculates $100.00 (10000 cents) accurately", () => {
    const res = calculateMarketplaceFees(10000);
    expect(res.marketplaceCommissionCents).toBe(500);
    expect(res.shippingHandlingInsuranceCents).toBe(500);
    expect(res.totalMarketplaceFeesCents).toBe(1000);
    expect(res.sellerProceedsCents).toBe(9000);
  });

  it("calculates $1,000.00 (100000 cents) accurately", () => {
    const res = calculateMarketplaceFees(100000);
    expect(res.marketplaceCommissionCents).toBe(5000);
    expect(res.shippingHandlingInsuranceCents).toBe(5000);
    expect(res.totalMarketplaceFeesCents).toBe(10000);
    expect(res.sellerProceedsCents).toBe(90000);
  });

  it("handles large amounts without floating point drift", () => {
    const res = calculateMarketplaceFees(12345679);
    expect(res.marketplaceCommissionCents + res.shippingHandlingInsuranceCents).toBe(
      res.totalMarketplaceFeesCents
    );
    expect(
      res.totalMarketplaceFeesCents + res.sellerProceedsCents
    ).toBe(res.merchandiseSubtotalCents);
  });

  it("handles decimal rounding boundaries cleanly", () => {
    const res = calculateMarketplaceFees(15); // 0.75 -> 1 cent each
    expect(res.marketplaceCommissionCents).toBe(1);
    expect(res.shippingHandlingInsuranceCents).toBe(1);
    expect(res.totalMarketplaceFeesCents).toBe(2);
    expect(res.sellerProceedsCents).toBe(13);
  });

  it("rejects negative subtotals and non-integer cents", () => {
    expect(() => calculateMarketplaceFees(-100)).toThrow();
    expect(() => calculateMarketplaceFees(10.5)).toThrow();
  });

  it("rejects invalid fee rates", () => {
    expect(() => calculateMarketplaceFees(1000, -0.01, 0.05)).toThrow();
    expect(() => calculateMarketplaceFees(1000, 0.6, 0.5)).toThrow();
  });
});
