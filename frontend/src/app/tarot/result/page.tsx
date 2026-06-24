import { PageHeader } from "@/components/PageHeader";
import { TarotResult } from "@/components/tarot/TarotResult";

export default async function TarotResultPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; cards?: string; question?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="page-shell tarot-result-page">
      <PageHeader />
      <TarotResult
        cardIds={(params.cards ?? "").split(",").filter(Boolean)}
        question={params.question}
        type={params.type}
      />
    </main>
  );
}
