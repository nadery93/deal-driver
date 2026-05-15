import { Nav } from "@/components/nav";
import { PromotionResults } from "@/components/promotion-results";
import { Disclaimer } from "@/components/ui";

export default function TrimPromotionsPage({ params }: { params: { state: string; make: string; model: string; trim: string } }) {
  return (
    <>
      <Nav />
      <main>
        <PromotionResults state={params.state} make={params.make} model={params.model} trim={params.trim} />
      </main>
      <Disclaimer />
    </>
  );
}
