import Image from "next/image";
import Link from "next/link";
import { MessageCircleQuestion, Sparkles, Wand2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { TarotReader } from "@/components/tarot/TarotReader";
import { services } from "@/lib/site";

export default function TarotPage() {
  const service = services.find((item) => item.slug === "tarot")!;

  return (
    <main className="page-shell detail-page">
      <PageHeader />

      <section className="detail-hero reverse">
        <div className="detail-copy">
          <span className="eyebrow">타로</span>
          <h1>{service.title}</h1>
          <p>{service.description}</p>
          <div className="reader-chip">담당 리더 {service.guideName}</div>
          <div className="hero-actions">
            <Link className="button primary" href="/consultation">
              타로 상담 신청
            </Link>
            <Link className="button glass" href="/login">
              로그인
            </Link>
          </div>
        </div>
        <div className="detail-image">
          <Image src={service.image} alt="" fill priority sizes="(max-width: 820px) 100vw, 480px" />
        </div>
      </section>

      <section className="detail-grid">
        <div className="guide-card">
          <MessageCircleQuestion size={22} />
          <strong>질문 방식</strong>
          <span>한 번에 하나의 질문을 명확하게 적으면 해석이 더 선명해집니다.</span>
        </div>
        <div className="guide-card">
          <Wand2 size={22} />
          <strong>풀이 범위</strong>
          <span>관계, 선택, 일의 방향, 가까운 흐름을 중심으로 봅니다.</span>
        </div>
        <div className="guide-card">
          <Sparkles size={22} />
          <strong>추천 상황</strong>
          <span>지금 결정해야 하는 문제나 상대의 마음이 궁금할 때 적합합니다.</span>
        </div>
      </section>

      <TarotReader />
    </main>
  );
}
