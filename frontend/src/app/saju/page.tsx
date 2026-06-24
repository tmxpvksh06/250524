import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { DailyFortuneReader } from "@/components/fortune/DailyFortuneReader";
import { SajuReader } from "@/components/saju/SajuReader";
import { services } from "@/lib/site";

export default function SajuPage() {
  const service = services.find((item) => item.slug === "saju")!;

  return (
    <main className="page-shell detail-page">
      <PageHeader />

      <section className="detail-hero">
        <div className="detail-image">
          <Image src={service.image} alt="" fill priority sizes="(max-width: 820px) 100vw, 480px" />
        </div>
        <div className="detail-copy">
          <span className="eyebrow">정통사주</span>
          <h1>{service.title}</h1>
          <p>{service.description}</p>
          <div className="reader-chip">담당 풀이사 {service.guideName}</div>
          <div className="hero-actions">
            <Link className="button primary" href="/consultation">
              상담 신청
            </Link>
            <Link className="button glass" href="/login">
              로그인
            </Link>
          </div>
        </div>
      </section>

      <section className="detail-grid">
        <div className="guide-card">
          <CalendarDays size={22} />
          <strong>필요 정보</strong>
          <span>생년월일, 태어난 시간, 성별, 궁금한 주제를 입력합니다.</span>
        </div>
        <div className="guide-card">
          <Clock size={22} />
          <strong>풀이 기준</strong>
          <span>성향, 대운 흐름, 올해 주의할 시기와 기회를 정리합니다.</span>
        </div>
        <div className="guide-card">
          <Sparkles size={22} />
          <strong>추천 질문</strong>
          <span>일, 관계, 재물, 방향성처럼 큰 흐름을 보는 질문에 적합합니다.</span>
        </div>
      </section>

      <SajuReader />
      <DailyFortuneReader />
    </main>
  );
}
