import Link from "next/link";
import Image from "next/image";
import { AuthPanel } from "@/components/AuthPanel";
import { ServiceCard } from "@/components/ServiceCard";
import { brand, services, steps } from "@/lib/site";

export default function Home() {
  return (
    <main>
      <section className="hero-screen">
        <Image className="hero-media" src="/images/hero-saju-guide.png" alt="" fill priority sizes="100vw" />
        <div className="hero-overlay" />
        <header className="appbar">
          <Link className="brand-mark" href="/">
            <span>{brand.name}</span>
          </Link>
          <nav className="nav" aria-label="주요 메뉴">
            <Link className="nav-link" href="/saju">
              정통사주
            </Link>
            <Link className="nav-link" href="/consultation">
              상담
            </Link>
            <Link className="nav-link" href="/tarot">
              타로
            </Link>
            <Link className="nav-link" href="/dashboard">
              MY
            </Link>
          </nav>
        </header>

        <div className="hero-content">
          <span className="rank">정통사주 · 타로</span>
          <h1>오늘의 흐름을 사주와 타로로 읽다</h1>
          <p>{brand.tagline}. 정통 사주와 타로를 중심으로 지금 필요한 질문을 차분하게 정리합니다.</p>
          <div className="hero-actions">
            <Link className="button primary" href="/consultation">
              상담 시작
            </Link>
            <Link className="button glass" href="/login">
              로그인
            </Link>
          </div>
        </div>
      </section>

      <section className="content-band" id="services">
        <div className="shell section-head">
          <div>
            <span className="eyebrow">운세 선택</span>
            <h2>궁금한 운세를 골라보세요</h2>
          </div>
          <Link className="text-link" href="/consultation">
            상담 신청
          </Link>
        </div>
        <div className="shell service-grid">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </section>

      <section className="shell flow-section">
        <div className="story-panel">
          <span className="eyebrow">이용 흐름</span>
          <h2>상담 흐름</h2>
          <div className="step-list">
            {steps.map((step, index) => (
              <div className="step-item" key={step}>
                <span>{index + 1}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
        </div>

        <div id="auth">
          <AuthPanel />
        </div>
      </section>
    </main>
  );
}
