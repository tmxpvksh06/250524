"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowDown, CalendarDays, LoaderCircle, LockKeyhole, Sparkles } from "lucide-react";
import { invokeEdgeApi } from "@/lib/edge-api";

type SajuProfile = {
  name: string;
  birthDate: string;
  birthTime: string;
  calendarType: string;
  gender: string;
  occupation: string;
  question: string;
  timezone: string;
};

const chapters = [
  {
    image: "/images/saju-webtoon/chapter-1.png",
    eyebrow: "첫 번째 이야기",
    title: "사주는 정답지가 아니라, 나를 읽는 지도예요",
    body: "앞날이 궁금한 마음은 자연스럽습니다. 야르렁당은 미래를 단정하기보다 내가 반복하는 선택과 강점을 먼저 살펴봅니다.",
    dialogues: [
      { speaker: "나", text: "앞으로 어떤 일을 선택해야 할지, 지금 방향이 맞는지 궁금해요.", side: "left", top: "12%" },
      { speaker: "서아린", text: "그 질문부터 천천히 풀어볼까요? 사주는 정답보다 나를 이해할 단서를 보여줘요.", side: "right", top: "70%" },
    ],
  },
  {
    image: "/images/saju-webtoon/chapter-2.png",
    eyebrow: "두 번째 이야기",
    title: "태어난 순간의 네 기둥을 펼쳐봅니다",
    body: "태어난 해·달·날·시간은 연주, 월주, 일주, 시주가 됩니다. 여덟 글자 안에서 나의 중심과 주변 환경의 관계를 읽습니다.",
    dialogues: [
      { speaker: "서아린", text: "태어난 해와 달, 날과 시간. 이 네 기둥이 사주팔자의 출발점이에요.", side: "right", top: "8%" },
      { speaker: "나", text: "같은 생일이어도 태어난 시간에 따라 해석이 달라질 수 있군요.", side: "left", top: "73%" },
    ],
  },
  {
    image: "/images/saju-webtoon/chapter-3.png",
    eyebrow: "세 번째 이야기",
    title: "오행의 균형을 현실의 선택으로 연결합니다",
    body: "목·화·토·금·수의 많고 적음은 좋고 나쁨이 아닙니다. 일, 관계, 재물, 생활 리듬에서 어떤 방식이 나에게 자연스러운지 해석합니다.",
    dialogues: [
      { speaker: "서아린", text: "오행이 많거나 적다고 무조건 좋고 나쁜 건 아니에요. 어떻게 쓰느냐가 중요하죠.", side: "right", top: "8%" },
      { speaker: "나", text: "그럼 제 성향을 일과 관계에서 어떻게 활용할지도 볼 수 있나요?", side: "left", top: "48%" },
      { speaker: "서아린", text: "네. 실제 생활에서 반복되는 패턴과 연결해서 설명해 드릴게요.", side: "right", top: "76%" },
    ],
  },
  {
    image: "/images/saju-webtoon/chapter-4.png",
    eyebrow: "네 번째 이야기",
    title: "사주는 소원을 대신 이루는 마법이 아닙니다",
    body: "재물과 성공의 가능성도 준비 방식, 판단 습관, 환경과 함께 살펴야 합니다. 모든 사고를 피하거나 결과를 보장한다고 말하지 않습니다.",
    dialogues: [
      { speaker: "나", text: "사주를 보면 언제 큰돈을 벌지, 나쁜 일을 모두 피할지도 알 수 있나요?", side: "left", top: "9%" },
      { speaker: "서아린", text: "그렇게 확정할 수는 없어요. 대신 돈을 다루는 성향과 기회를 준비하는 방식을 읽을 수 있어요.", side: "right", top: "43%" },
      { speaker: "서아린", text: "예언보다 중요한 건, 갈림길에서 내가 더 나은 선택을 할 수 있도록 돕는 일이에요.", side: "right", top: "76%" },
    ],
  },
  {
    image: "/images/saju-webtoon/chapter-5.png",
    eyebrow: "다섯 번째 이야기",
    title: "계산된 원국을 기준으로 해석합니다",
    body: "야르렁당은 생년월일과 태어난 시간으로 원국을 먼저 계산합니다. AI는 계산값을 바꾸지 않고 성향과 현실적인 활용법을 풀어냅니다.",
    dialogues: [
      { speaker: "서아린", text: "먼저 연주·월주·일주·시주를 계산하고, 오행과 십성의 관계를 확인해요.", side: "right", top: "8%" },
      { speaker: "나", text: "마음을 읽는 게 아니라, 계산된 자료를 해석하는 과정이군요.", side: "left", top: "48%" },
      { speaker: "서아린", text: "맞아요. 원국 데이터와 해석을 구분해서 결과에도 함께 보여드릴게요.", side: "right", top: "76%" },
    ],
  },
  {
    image: "/images/saju-webtoon/chapter-6.png",
    eyebrow: "여섯 번째 이야기",
    title: "가능한 흐름을 보고, 선택은 당신이 합니다",
    body: "운의 흐름은 가능성이 커지는 시기와 준비가 필요한 시기를 살피는 도구입니다. 최종 방향은 언제나 현재의 선택과 행동으로 달라집니다.",
    dialogues: [
      { speaker: "나", text: "그럼 제 미래는 이미 정해져 있는 게 아닌가요?", side: "left", top: "8%" },
      { speaker: "서아린", text: "아니에요. 같은 흐름에서도 어떤 선택을 하느냐에 따라 길은 달라집니다.", side: "right", top: "36%" },
      { speaker: "서아린", text: "이제 당신의 네 기둥을 펼쳐볼게요. 준비되셨나요?", side: "right", top: "72%" },
    ],
  },
] as const;

export function SajuReader() {
  const router = useRouter();
  const endRef = useRef<HTMLDivElement>(null);
  const [profile, setProfile] = useState<SajuProfile | null>(null);
  const [guideOpen, setGuideOpen] = useState(false);
  const [guideComplete, setGuideComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!guideOpen || !endRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setGuideComplete(true);
      },
      { threshold: 0.8 },
    );
    observer.observe(endRef.current);
    return () => observer.disconnect();
  }, [guideOpen]);

  function prepareReading(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setProfile({
      name: String(form.get("name") ?? "").trim(),
      birthDate: String(form.get("birthDate") ?? ""),
      birthTime: String(form.get("birthTime") ?? ""),
      calendarType: String(form.get("calendarType") ?? "solar"),
      gender: String(form.get("gender") ?? ""),
      occupation: String(form.get("occupation") ?? "").trim(),
      question: String(form.get("question") ?? "").trim(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Seoul",
    });
    setGuideComplete(false);
    setGuideOpen(true);
    setError("");
    requestAnimationFrame(() => document.querySelector(".saju-webtoon-guide")?.scrollIntoView({ behavior: "smooth" }));
  }

  async function generateReading() {
    if (!profile || !guideComplete || loading) return;
    setLoading(true);
    setError("");
    try {
      const body = await invokeEdgeApi<Record<string, unknown>>("saju-reading", profile);
      sessionStorage.setItem("wolmyeongdang-saju-result", JSON.stringify(body));
      router.push("/saju/result");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "정통사주 결과를 생성하지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="saju-reading-section">
      <form className="panel saju-reading-form" onSubmit={prepareReading}>
        <div className="section-head">
          <div>
            <span className="eyebrow dark">Four Pillars Reading</span>
            <h2>나의 사주팔자 자세히 보기</h2>
          </div>
          <CalendarDays color="#a63d2e" size={28} />
        </div>
        <p className="panel-copy">입력한 정보로 원국을 계산한 뒤 오행, 십성, 성향과 삶의 흐름을 단계별로 해석합니다.</p>

        <div className="two-col">
          <label className="field">이름 또는 닉네임<input className="input" maxLength={30} name="name" placeholder="결과에 표시할 이름" /></label>
          <label className="field">생년월일 <b className="required-mark">필수</b><input className="input" max={new Date().toISOString().slice(0, 10)} name="birthDate" required type="date" /></label>
        </div>
        <div className="fortune-period-profile">
          <label className="field">달력 기준<select className="input" defaultValue="solar" name="calendarType"><option value="solar">양력</option><option value="lunar">음력</option></select></label>
          <label className="field">성별 <b className="required-mark">필수</b><select className="input" defaultValue="" name="gender" required><option disabled value="">선택하세요</option><option value="female">여성</option><option value="male">남성</option></select></label>
          <label className="field">태어난 시간 <b className="required-mark">필수</b><input className="input" name="birthTime" required type="time" /></label>
        </div>
        <label className="field">직업·현재 역할<input className="input" maxLength={80} name="occupation" placeholder="예: 대학생, 개발자, 취업 준비" /></label>
        <label className="field">가장 궁금한 질문<textarea className="textarea" maxLength={400} name="question" placeholder="일, 관계, 재물, 진로처럼 자세히 알고 싶은 주제를 적어주세요." rows={4} /></label>
        <button className="button primary wide" type="submit"><Sparkles size={18} />사주 풀이 시작하기</button>
      </form>

      {guideOpen ? (
        <section className="saju-webtoon-guide">
          <header>
            <span className="eyebrow">Before Your Reading</span>
            <h2>사주를 처음 보는 당신에게</h2>
            <p>잠시 아래로 내려가며 야르렁당의 풀이 방식을 확인해 주세요.</p>
            <ArrowDown aria-hidden="true" />
          </header>
          {chapters.map((chapter, index) => (
            <article className="saju-webtoon-chapter" key={chapter.image}>
              <div className="saju-webtoon-image">
                <Image alt="" fill priority={index === 0} sizes="(max-width: 760px) 100vw, 720px" src={chapter.image} />
              </div>
              <div className="webtoon-dialogues" aria-label={`${chapter.eyebrow} 등장인물 대화`}>
                {chapter.dialogues.map((dialogue) => (
                  <blockquote
                    className={`webtoon-speech ${dialogue.side}`}
                    key={`${chapter.image}-${dialogue.text}`}
                  >
                    <strong>{dialogue.speaker}</strong>
                    <p>{dialogue.text}</p>
                  </blockquote>
                ))}
              </div>
              <div className="saju-webtoon-summary">
                <span>{chapter.eyebrow}</span>
                <h3>{chapter.title}</h3>
                <p>{chapter.body}</p>
              </div>
            </article>
          ))}
          <article className="saju-webtoon-ending">
            <span className="eyebrow">마지막 이야기</span>
            <h2>운명은 고정된 결론이 아니라<br />선택을 더 잘하기 위한 단서입니다.</h2>
            <p>계산된 사주 원국은 그대로 보여드리고, AI는 그 데이터에서 벗어나지 않는 범위로 해석합니다.</p>
            <div className="saju-trust-list">
              <span><LockKeyhole size={18} />입력 정보는 API 계산과 해석에만 사용</span>
              <span><Sparkles size={18} />원국 계산값과 AI 해석을 분리</span>
            </div>
            <div ref={endRef} />
            <button className="button primary wide" disabled={!guideComplete || loading} onClick={generateReading} type="button">
              {loading ? <LoaderCircle className="spin" size={18} /> : <Sparkles size={18} />}
              {guideComplete ? "내 사주팔자 자세히 보기" : "웹툰을 끝까지 읽어주세요"}
            </button>
            {error ? <p className="notice">{error}</p> : null}
          </article>
        </section>
      ) : null}
    </section>
  );
}
