import { redirect } from "next/navigation";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchRedirectPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const q = (params.q ?? "").trim();
  if (q) {
    redirect(`/shop?q=${encodeURIComponent(q)}`);
  }
  redirect("/shop");
}
