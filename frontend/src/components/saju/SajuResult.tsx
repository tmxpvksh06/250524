"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";

type Result = {
  profile: { name: string; birthDate: string; birthTime: string };
  chart: {
    solarDate: string;
    lunarDate: string;
    eightCharacters: string;
    dayMaster: string;
    pillars: Array<{ label: string; ganji: string; wuXing: string; tenGod: string; hidden: string[]; naYin: string }>;
    elements: Record<string, number>;
  };
  interpretation: {
    title: string;
    opening: string;
    coreNature: string;
    strengths: string[];
    blindSpots: string[];
    career: string;
    wealth: string;
    relationship: string;
    wellbeing: string;
    usefulElements: string;
    currentYear: string;
    timing: Array<{ period: string; theme: string; reading: string }>;
    questionAnswer: string;
    closing: string;
  };
};

export function SajuResult() {
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("wolmyeongdang-saju-result");
    if (saved) setResult(JSON.parse(saved));
  }, []);

  if (!result) {
    return (
      <section className="panel saju-result-empty">
        <h1>표시할 사주 결과가 없습니다</h1>
        <p>정통사주 페이지에서 생년월일과 태어난 시간을 입력해 주세요.</p>
        <Link className="button primary" href="/saju"><ArrowLeft size={18} />입력 화면으로 돌아가기</Link>
      </section>
    );
  }

  const { chart, interpretation } = result;

  return (
    <article className="saju-result-page">
      <header className="saju-result-hero panel">
        <span className="eyebrow dark">Wolmyeongdang Four Pillars</span>
        <h1>{interpretation.title}</h1>
        <p>{interpretation.opening}</p>
        <div>{result.profile.birthDate} · {result.profile.birthTime} · {chart.eightCharacters}</div>
      </header>

      <section className="panel">
        <div className="section-head"><div><span className="eyebrow dark">원국</span><h2>나의 사주팔자 네 기둥</h2></div></div>
        <div className="saju-pillars">
          {chart.pillars.map((pillar) => (
            <div key={pillar.label}>
              <span>{pillar.label}</span>
              <strong>{pillar.ganji}</strong>
              <small>{pillar.wuXing}</small>
              <b>{pillar.tenGod}</b>
              <em>{pillar.naYin}</em>
            </div>
          ))}
        </div>
        <p className="saju-chart-note">양력 {chart.solarDate} · 음력 {chart.lunarDate} · 일간 {chart.dayMaster}</p>
      </section>

      <section className="panel">
        <span className="eyebrow dark">오행 균형</span>
        <h2>목·화·토·금·수의 분포</h2>
        <div className="element-bars">
          {Object.entries(chart.elements).map(([name, count]) => (
            <div key={name}><strong>{name}</strong><span><i style={{ width: `${Math.max(count * 22, 6)}%` }} /></span><b>{count}</b></div>
          ))}
        </div>
        <p className="panel-copy">{interpretation.usefulElements}</p>
      </section>

      <section className="saju-result-grid">
        <article className="panel"><span className="eyebrow dark">타고난 중심</span><h2>나의 기본 성향</h2><p>{interpretation.coreNature}</p></article>
        <article className="panel"><span className="eyebrow dark">강점</span><h2>잘 활용하면 빛나는 힘</h2><ul>{interpretation.strengths.map((item) => <li key={item}>{item}</li>)}</ul></article>
        <article className="panel"><span className="eyebrow dark">주의점</span><h2>과하게 사용할 때의 맹점</h2><ul>{interpretation.blindSpots.map((item) => <li key={item}>{item}</li>)}</ul></article>
      </section>

      <section className="saju-topic-grid">
        {[["직업·진로", interpretation.career], ["재물", interpretation.wealth], ["관계·연애", interpretation.relationship], ["생활 리듬", interpretation.wellbeing]].map(([title, body]) => (
          <article className="panel" key={title}><span className="eyebrow dark">Detailed Reading</span><h2>{title}</h2><p>{body}</p></article>
        ))}
      </section>

      <section className="panel">
        <span className="eyebrow dark">운의 흐름</span>
        <h2>현재와 앞으로의 시기</h2>
        <p className="panel-copy">{interpretation.currentYear}</p>
        <div className="saju-timeline">
          {interpretation.timing.map((item) => <div key={item.period}><span>{item.period}</span><strong>{item.theme}</strong><p>{item.reading}</p></div>)}
        </div>
      </section>

      <section className="panel saju-question-answer">
        <Sparkles size={24} />
        <span className="eyebrow dark">당신의 질문</span>
        <h2>맞춤 풀이</h2>
        <p>{interpretation.questionAnswer}</p>
      </section>

      <blockquote className="fortune-closing">{interpretation.closing}</blockquote>
      <div className="button-row result-actions">
        <Link className="button glass" href="/saju"><ArrowLeft size={18} />다시 입력하기</Link>
        <Link className="button primary" href="/consultation">상담 신청</Link>
      </div>
    </article>
  );
}
