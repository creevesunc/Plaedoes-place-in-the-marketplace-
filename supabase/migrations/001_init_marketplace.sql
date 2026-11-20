-- Enable UUID extension
create extension if not exists "pgcrypto";

-- Enums
create type user_role as enum ('BUYER', 'SELLER', 'ADMIN');
create type seller_status as enum (
  'NOT_APPLIED',
  'APPLICATION_PENDING',
  'APPROVED',
  'REJECTED',
  'SUSPENDED',
  'DISABLED'
);
create type product_status as enum ('DRAFT', 'PUBLISHED', 'PAUSED', 'SOLD_OUT');
create type product_condition as enum ('NEW', 'LIKE_NEW', 'GOOD', 'FAIR', 'REFURBISHED');
create type order_status as enum (
  'PENDING_PAYMENT',
  'PAID',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'COMPLETED',
  'CANCELLED',
  'REFUNDED',
  'DISPUTED'
);
create type payout_eligibility_status as enum (
  'HELD',
  'ELIGIBLE',
  'TRANSFERRED',
  'DISPUTE_HOLD',
  'BLOCKED'
);

-- Profiles (extends auth.users)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  phone text,
  role user_role not null default 'BUYER',
  seller_status seller_status not null default 'NOT_APPLIED',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Addresses
create table addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  label text not null default 'Home',
  recipient_name text not null,
  line1 text not null,
  line2 text,
  city text not null,
  state text not null,
  postal_code text not null,
  country text not null default 'US',
  phone text,
  is_default_shipping boolean not null default false,
  is_default_billing boolean not null default false,
  created_at timestamptz not null default now()
);

-- Categories (Main & Subcategories)
create table categories (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  icon_name text,
  seo_title text,
  seo_description text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

-- Seller Stores & Applications
create table seller_stores (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null unique references profiles(id) on delete cascade,
  business_name text not null,
  store_name text not null,
  slug text not null unique,
  store_description text,
  business_type text,
  business_address jsonb,
  logo_url text,
  banner_url text,
  shipping_policy text,
  return_policy text,
  agreement_accepted_at timestamptz,
  status seller_status not null default 'APPLICATION_PENDING',
  stripe_account_id text,
  stripe_charges_enabled boolean not null default false,
  stripe_payouts_enabled boolean not null default false,
  stripe_details_submitted boolean not null default false,
  rating_avg numeric(3,2) not null default 0.00,
  rating_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Products
create table products (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references profiles(id) on delete cascade,
  store_id uuid not null references seller_stores(id) on delete cascade,
  category_id uuid not null references categories(id),
  subcategory_id uuid references categories(id),
  title text not null,
  slug text not null unique,
  description text not null,
  sku text not null,
  brand text,
  model text,
  condition product_condition not null default 'NEW',
  status product_status not null default 'DRAFT',
  price_cents integer not null check (price_cents >= 0),
  sale_price_cents integer check (sale_price_cents is null or sale_price_cents >= 0),
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  low_stock_threshold integer not null default 5 check (low_stock_threshold >= 0),
  handling_days integer not null default 2 check (handling_days >= 0),
  shipping_cost_cents integer not null default 0 check (shipping_cost_cents >= 0),
  weight_grams integer,
  dimensions_json jsonb,
  variants_json jsonb not null default '[]'::jsonb,
  tags text[] not null default '{}',
  is_featured boolean not null default false,
  is_trending boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Product Images
create table product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  url text not null,
  alt_text text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Marketplace Fee Settings (Initial 5% commission + 5% shipping/handling insurance)
create table marketplace_fee_settings (
  id uuid primary key default gen_random_uuid(),
  commission_rate numeric(6,4) not null default 0.0500,
  shipping_handling_insurance_rate numeric(6,4) not null default 0.0500,
  payout_hold_days integer not null default 7,
  updated_by uuid references profiles(id),
  updated_at timestamptz not null default now()
);

insert into marketplace_fee_settings (commission_rate, shipping_handling_insurance_rate, payout_hold_days)
values (0.0500, 0.0500, 7);

-- Fee Change Audit Log
create table marketplace_fee_logs (
  id uuid primary key default gen_random_uuid(),
  changed_by uuid references profiles(id),
  previous_commission_rate numeric(6,4) not null,
  new_commission_rate numeric(6,4) not null,
  previous_insurance_rate numeric(6,4) not null,
  new_insurance_rate numeric(6,4) not null,
  reason text,
  created_at timestamptz not null default now()
);

-- Orders (Snapshots fee rates & integer cents at purchase time)
create table orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  buyer_id uuid not null references profiles(id),
  store_id uuid not null references seller_stores(id),
  status order_status not null default 'PENDING_PAYMENT',
  payout_status payout_eligibility_status not null default 'HELD',
  merchandise_subtotal_cents integer not null check (merchandise_subtotal_cents >= 0),
  shipping_cost_cents integer not null default 0 check (shipping_cost_cents >= 0),
  tax_cents integer not null default 0 check (tax_cents >= 0),
  discount_cents integer not null default 0 check (discount_cents >= 0),
  commission_rate numeric(6,4) not null default 0.0500,
  shipping_handling_insurance_rate numeric(6,4) not null default 0.0500,
  marketplace_commission_cents integer not null check (marketplace_commission_cents >= 0),
  shipping_handling_insurance_cents integer not null check (shipping_handling_insurance_cents >= 0),
  total_marketplace_fees_cents integer not null check (total_marketplace_fees_cents >= 0),
  seller_proceeds_cents integer not null check (seller_proceeds_cents >= 0),
  total_charged_cents integer not null check (total_charged_cents >= 0),
  shipping_address_json jsonb not null,
  billing_address_json jsonb not null,
  tracking_carrier text,
  tracking_number text,
  shipped_at timestamptz,
  delivered_at timestamptz,
  payout_eligible_at timestamptz,
  stripe_checkout_session_id text,
  stripe_payment_intent_id text,
  stripe_transfer_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Order Line Items
create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid not null references products(id),
  product_title_snapshot text not null,
  sku_snapshot text not null,
  variant_snapshot jsonb,
  quantity integer not null check (quantity > 0),
  unit_price_cents integer not null check (unit_price_cents >= 0),
  line_total_cents integer not null check (line_total_cents >= 0)
);

-- Disputes
create table disputes (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  opened_by uuid not null references profiles(id),
  reason text not null,
  description text not null,
  status text not null default 'OPEN',
  resolution_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Audit Logs
create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references profiles(id),
  action text not null,
  entity_type text not null,
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- Seed Required Initial Categories
insert into categories (name, slug, sort_order, is_featured) values
  ('Electronics', 'electronics', 1, true),
  ('Computers', 'computers', 2, true),
  ('Phones', 'phones', 3, true),
  ('Accessories', 'accessories', 4, false),
  ('Home & Living', 'home-and-living', 5, true),
  ('Furniture', 'furniture', 6, false),
  ('Clothing', 'clothing', 7, true),
  ('Shoes', 'shoes', 8, false),
  ('Jewelry', 'jewelry', 9, true),
  ('Collectibles', 'collectibles', 10, false),
  ('Toys & Games', 'toys-and-games', 11, false),
  ('Books', 'books', 12, false),
  ('Arts & Crafts', 'arts-and-crafts', 13, true),
  ('Tools', 'tools', 14, false),
  ('Automotive', 'automotive', 15, false),
  ('Sports & Outdoors', 'sports-and-outdoors', 16, false),
  ('Beauty & Personal Care', 'beauty-and-personal-care', 17, false),
  ('Pet Supplies', 'pet-supplies', 18, false),
  ('Office Supplies', 'office-supplies', 19, false),
  ('Other', 'other', 20, false);

-- Enable Row Level Security
alter table profiles enable row level security;
alter table addresses enable row level security;
alter table categories enable row level security;
alter table seller_stores enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table disputes enable row level security;

-- Basic RLS Policies
create policy "Public read active categories" on categories
  for select using (is_active = true);

create policy "Public read published products" on products
  for select using (status = 'PUBLISHED');

create policy "Sellers manage own products" on products
  for all using (auth.uid() = seller_id) with check (auth.uid() = seller_id);

create policy "Public read product images" on product_images
  for select using (true);

create policy "Users manage own addresses" on addresses
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Buyers and sellers view own orders" on orders
  for select using (
    auth.uid() = buyer_id or
    exists (
      select 1 from seller_stores s
      where s.id = orders.store_id and s.owner_id = auth.uid()
    )
  );
