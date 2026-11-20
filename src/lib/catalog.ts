export type ProductCondition = "NEW" | "LIKE_NEW" | "GOOD" | "FAIR" | "REFURBISHED";

export type MarketplaceProduct = {
  id: string;
  slug: string;
  title: string;
  description: string;
  sku: string;
  brand: string;
  model: string;
  condition: ProductCondition;
  categorySlug: string;
  categoryName: string;
  sellerName: string;
  storeSlug: string;
  priceCents: number;
  salePriceCents?: number | null;
  stockQuantity: number;
  ratingAvg: number;
  shippingCostCents: number;
  handlingDays: number;
  variants: {
    sizes: string[];
    colors: string[];
  };
  tags: string[];
  featured?: boolean;
  trending?: boolean;
  newArrival?: boolean;
};

export const INITIAL_CATEGORIES = [
  "Electronics",
  "Computers",
  "Phones",
  "Accessories",
  "Home & Living",
  "Furniture",
  "Clothing",
  "Shoes",
  "Jewelry",
  "Collectibles",
  "Toys & Games",
  "Books",
  "Arts & Crafts",
  "Tools",
  "Automotive",
  "Sports & Outdoors",
  "Beauty & Personal Care",
  "Pet Supplies",
  "Office Supplies",
  "Other",
];

export const CATALOG_ITEMS: MarketplaceProduct[] = [
  {
    id: "prod-101",
    slug: "stoneware-pour-over-carafe-set",
    title: "Hand-Thrown Stoneware Pour-Over Carafe Set",
    description:
      "Wheel-thrown stoneware dripper and thermal carafe finished in satin mineral glaze for clean daily brewing.",
    sku: "PL-HOME-101",
    brand: "Blue Ridge Kiln Co.",
    model: "PO-600",
    condition: "NEW",
    categorySlug: "home-and-living",
    categoryName: "Home & Living",
    sellerName: "Blue Ridge Kiln Co.",
    storeSlug: "blue-ridge-kiln-co",
    priceCents: 6800,
    salePriceCents: null,
    stockQuantity: 14,
    ratingAvg: 4.9,
    shippingCostCents: 700,
    handlingDays: 2,
    variants: {
      sizes: ["600ml"],
      colors: ["Speckled Oat", "Moss Slate"],
    },
    tags: ["coffee", "ceramic", "pour-over", "kitchen"],
    featured: true,
    trending: true,
  },
  {
    id: "prod-102",
    slug: "aluminum-6-key-macro-pad",
    title: "CNC Aluminum 6-Key Mechanical Macro Pad",
    description:
      "Hot-swappable hotkeys with rotary encoder knob for shortcuts, timeline scrubbing, and custom layers.",
    sku: "PL-COMP-102",
    brand: "Keycraft Studio",
    model: "KC-6K",
    condition: "NEW",
    categorySlug: "computers",
    categoryName: "Computers",
    sellerName: "Keycraft Studio",
    storeSlug: "keycraft-studio",
    priceCents: 5400,
    salePriceCents: 4900,
    stockQuantity: 22,
    ratingAvg: 4.8,
    shippingCostCents: 500,
    handlingDays: 1,
    variants: {
      sizes: ["Compact 6-Key"],
      colors: ["Anodized Black", "Silver"],
    },
    tags: ["keyboard", "desk-setup", "productivity", "usb-c"],
    featured: true,
    trending: true,
  },
  {
    id: "prod-103",
    slug: "bridle-leather-field-strap",
    title: "Full-Grain Bridle Leather Camera & Bag Strap",
    description:
      "Hand-stitched vegetable-tanned leather strap with solid brass hardware built to age with character.",
    sku: "PL-ACC-103",
    brand: "Heritage Goods Workshop",
    model: "HG-STRP-01",
    condition: "NEW",
    categorySlug: "accessories",
    categoryName: "Accessories",
    sellerName: "Heritage Goods Workshop",
    storeSlug: "heritage-goods-workshop",
    priceCents: 4200,
    salePriceCents: null,
    stockQuantity: 9,
    ratingAvg: 4.7,
    shippingCostCents: 450,
    handlingDays: 3,
    variants: {
      sizes: ["Standard 42in", "Long 50in"],
      colors: ["Chestnut", "Espresso"],
    },
    tags: ["leather", "brass", "carry", "handmade"],
    newArrival: true,
  },
  {
    id: "prod-104",
    slug: "botanical-linen-throw-pillow",
    title: "Washed Belgian Linen Lumbar Cushion Cover",
    description:
      "Breathable heavyweight linen cushion cover with concealed zipper and reinforced seam stitching.",
    sku: "PL-ART-104",
    brand: "Loom & Meadow",
    model: "LM-LMB-20",
    condition: "NEW",
    categorySlug: "arts-and-crafts",
    categoryName: "Arts & Crafts",
    sellerName: "Loom & Meadow",
    storeSlug: "loom-and-meadow",
    priceCents: 3600,
    salePriceCents: null,
    stockQuantity: 18,
    ratingAvg: 4.8,
    shippingCostCents: 500,
    handlingDays: 2,
    variants: {
      sizes: ["12x20 in", "14x24 in"],
      colors: ["Sage", "Warm Sand", "Charcoal"],
    },
    tags: ["linen", "textiles", "home", "decor"],
    newArrival: true,
  },
];

export function slugifyCategory(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
