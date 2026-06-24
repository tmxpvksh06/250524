import Link from "next/link";
import { CalendarDays, Clock, ImageUp, Sparkles, UserRound } from "lucide-react";
import { brand, services } from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";

export default function ConsultationPage() {
  return (
    <main className="page-shell">
      <PageHeader />

      <section className="consult-hero">
        <span className="eyebrow">Reading Request</span>
        <h1>상담 신청</h1>
        <p>{brand.name}에서 받을 풀이를 고르고 필요한 정보를 남겨주세요.</p>
      </section>

      <section className="consult-layout">
        <form className="panel form large-form">
          <label className="field">
            상담 종류
            <select className="input" defaultValue="정통 사주 - 서아린">
              {services.map((service) => (
                <option key={service.title}>
                  {service.title} - {service.guideName}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            이름
            <input className="input" placeholder="이름을 입력하세요" />
          </label>
          <label className="field">
            연락 이메일
            <input className="input" type="email" placeholder="answer@example.com" />
          </label>
          <div className="two-col">
            <label className="field">
              생년월일
              <input className="input" type="date" />
            </label>
            <label className="field">
              태어난 시간
              <input className="input" type="time" />
            </label>
          </div>
          <label className="field">
            상담 내용
            <textarea className="textarea" placeholder="궁금한 내용을 적어주세요" rows={6} />
          </label>
          <div className="button-row">
            <Link className="button primary wide" href="/upload">
              <ImageUp size={18} />
              이미지 첨부
            </Link>
            <Link className="button glass dark wide" href="/dashboard">
              <UserRound size={18} />
              MY에서 확인
            </Link>
          </div>
        </form>

        <aside className="guide-stack">
          <div className="guide-card">
            <Sparkles size={22} />
            <strong>정통 사주</strong>
            <span>생년월일과 태어난 시간을 기준으로 큰 흐름을 봅니다.</span>
          </div>
          <div className="guide-card">
            <CalendarDays size={22} />
            <strong>타로</strong>
            <span>지금 고민하는 질문을 짧고 명확하게 적어주세요.</span>
          </div>
          <div className="guide-card">
            <Clock size={22} />
            <strong>로컬 테스트</strong>
            <span>현재 화면은 Supabase 연결 전에도 UI 확인이 가능합니다.</span>
          </div>
        </aside>
      </section>
    </main>
  );
}
