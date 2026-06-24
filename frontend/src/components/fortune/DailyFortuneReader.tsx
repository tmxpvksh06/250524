"use client";

import { FormEvent, useState } from "react";
import { CalendarDays, Clock3, Cookie, LoaderCircle, MoonStar, Sparkles } from "lucide-react";

type FortuneMode = "period" | "cookie" | "animal" | "star";

type CookieFortune = {
  message: string;
  luckyWord: string;
  action: string;
};

type SignFortune = {
  sign: string;
  symbol: string;
  dateLabel: string;
  headline: string;
  summary: string;
  strengths: string[];
  focus: {
    love: string;
    work: string;
    money: string;
    wellbeing: string;
  };
  lucky: {
    color: string;
    number: string;
    item: string;
  };
  caution: string;
  action: string;
};

type FortuneArea = {
  category: string;
  score: number;
  headline: string;
  detail: string;
  action: string;
};

type PeriodFortune = {
  title: string;
  overallScore: number;
  summary: string;
  fortunes: {
    overall: FortuneArea;
    love: FortuneArea;
    money: FortuneArea;
    career: FortuneArea;
    study: FortuneArea;
    grades: FortuneArea;
    health: FortuneArea;
  };
  timeFlow: Array<{ period: string; reading: string }>;
  lucky: { color: string; number: string; direction: string; item: string };
  recommendedActions: string[];
  cautions: string[];
  closingMessage: string;
};

const periodOptions = [
  { id: "today", label: "오늘의 운세", description: "오늘 하루의 흐름" },
  { id: "week", label: "이주의 운세", description: "이번 주의 기회와 주의점" },
  { id: "month", label: "이달의 운세", description: "이번 달 전체 흐름" },
  { id: "year", label: "올해의 운세", description: "올해의 큰 방향과 변화" },
] as const;

const areaOptions: Array<{ id: keyof PeriodFortune["fortunes"]; label: string }> = [
  { id: "overall", label: "총운" },
  { id: "love", label: "애정운" },
  { id: "money", label: "금전운" },
  { id: "career", label: "직장운" },
  { id: "study", label: "학업운" },
  { id: "grades", label: "성적운" },
  { id: "health", label: "건강운" },
];

const modes: Array<{
  id: FortuneMode;
  label: string;
  description: string;
}> = [
  { id: "period", label: "기간별운세", description: "오늘·이번 주·이번 달·올해의 흐름" },
  { id: "cookie", label: "포춘쿠키", description: "쿠키를 깨고 오늘의 한마디를 확인하세요" },
  { id: "animal", label: "띠별운세", description: "음력 연도 경계를 반영한 나의 띠 운세" },
  { id: "star", label: "별자리운세", description: "생일에 해당하는 별자리의 오늘 운세" },
];

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export function DailyFortuneReader() {
  const [mode, setMode] = useState<FortuneMode>("period");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cookieBroken, setCookieBroken] = useState(false);
  const [cookieResult, setCookieResult] = useState<CookieFortune | null>(null);
  const [signResult, setSignResult] = useState<SignFortune | null>(null);
  const [periodResult, setPeriodResult] = useState<PeriodFortune | null>(null);
  const [activeArea, setActiveArea] = useState<keyof PeriodFortune["fortunes"]>("overall");

  function changeMode(nextMode: FortuneMode) {
    setMode(nextMode);
    setError("");
    setSignResult(null);
    setPeriodResult(null);
  }

  async function crackCookie() {
    if (loading || cookieBroken) return;
    setCookieBroken(true);
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${apiUrl}/api/fortune/cookie`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Seoul",
        }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "포춘쿠키 메시지를 만들지 못했습니다.");
      setCookieResult(body.result);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "포춘쿠키 메시지를 만들지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }

  async function submitSignFortune(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");
    setSignResult(null);

    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch(`${apiUrl}/api/fortune/sign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          name: String(form.get("name") ?? ""),
          birthDate: String(form.get("birthDate") ?? ""),
          calendarType: mode === "animal" ? String(form.get("calendarType") ?? "solar") : "solar",
          gender: String(form.get("gender") ?? "unspecified"),
          currentFocus: String(form.get("currentFocus") ?? ""),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Seoul",
        }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "운세를 생성하지 못했습니다.");
      setSignResult(body.result);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "운세를 생성하지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }

  async function submitPeriodFortune(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");
    setPeriodResult(null);

    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch(`${apiUrl}/api/fortune/daily`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fortunePeriod: String(form.get("fortunePeriod") ?? "today"),
          name: String(form.get("name") ?? ""),
          birthDate: String(form.get("birthDate") ?? ""),
          birthTime: String(form.get("birthTime") ?? ""),
          birthTimeKnown: Boolean(form.get("birthTime")),
          calendarType: String(form.get("calendarType") ?? "solar"),
          gender: String(form.get("gender") ?? ""),
          relationshipStatus: "unspecified",
          occupation: String(form.get("occupation") ?? ""),
          currentMood: String(form.get("currentMood") ?? ""),
          question: String(form.get("question") ?? ""),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Seoul",
        }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "기간별 운세를 생성하지 못했습니다.");
      setPeriodResult(body.result);
      setActiveArea("overall");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "기간별 운세를 생성하지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="daily-fortune-section">
      <div className="fortune-main-tabs" role="tablist" aria-label="오늘의 운세 종류">
        {modes.map((item) => (
          <button
            aria-selected={mode === item.id}
            className={mode === item.id ? "active" : ""}
            key={item.id}
            onClick={() => changeMode(item.id)}
            role="tab"
            type="button"
          >
            {item.id === "period" ? <Clock3 size={22} /> : item.id === "cookie" ? <Cookie size={22} /> : item.id === "animal" ? <CalendarDays size={22} /> : <MoonStar size={22} />}
            <span>
              <strong>{item.label}</strong>
              <small>{item.description}</small>
            </span>
          </button>
        ))}
      </div>

      {mode === "period" ? (
        <div className="fortune-period-layout">
          <form className="panel fortune-period-form" onSubmit={submitPeriodFortune}>
            <div className="section-head">
              <div>
                <span className="eyebrow dark">Traditional Daily Fortune</span>
                <h2>기간별 정통 운세</h2>
              </div>
              <CalendarDays color="#a63d2e" size={28} />
            </div>

            <fieldset className="fortune-required-group">
              <legend>확인할 운세</legend>
              <div className="period-option-grid">
                {periodOptions.map((period, index) => (
                  <label key={period.id}>
                    <input defaultChecked={index === 0} name="fortunePeriod" type="radio" value={period.id} />
                    <strong>{period.label}</strong>
                    <span>{period.description}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="two-col">
              <label className="field">
                이름 또는 닉네임
                <input className="input" maxLength={30} name="name" placeholder="결과에 표시할 이름" />
              </label>
              <label className="field">
                생년월일 <b className="required-mark">필수</b>
                <input className="input" max={new Date().toISOString().slice(0, 10)} name="birthDate" required type="date" />
              </label>
            </div>

            <div className="fortune-period-profile">
              <label className="field">
                달력 기준
                <select className="input" defaultValue="solar" name="calendarType">
                  <option value="solar">양력</option>
                  <option value="lunar">음력</option>
                </select>
              </label>
              <label className="field">
                성별 <b className="required-mark">필수</b>
                <select className="input" defaultValue="" name="gender" required>
                  <option disabled value="">선택하세요</option>
                  <option value="female">여성</option>
                  <option value="male">남성</option>
                </select>
              </label>
              <label className="field">
                태어난 시간
                <input className="input" name="birthTime" type="time" />
              </label>
            </div>

            <label className="field">
              직업·현재 역할
              <input className="input" maxLength={80} name="occupation" placeholder="예: 대학생, 개발자, 취업 준비" />
            </label>
            <label className="field">
              현재 상황
              <input className="input" maxLength={150} name="currentMood" placeholder="예: 새로운 일을 앞두고 고민 중이에요" />
            </label>
            <label className="field">
              가장 궁금한 질문
              <textarea className="textarea" maxLength={400} name="question" placeholder="이번 기간에 가장 알고 싶은 일을 적어주세요." rows={4} />
            </label>

            <button className="button primary wide" disabled={loading} type="submit">
              {loading ? <LoaderCircle className="spin" size={18} /> : <Sparkles size={18} />}
              AI 기간별 운세 생성
            </button>
            {error ? <p className="notice">{error}</p> : null}
          </form>

          {periodResult ? (
            <article aria-live="polite" className="panel fortune-period-result">
              <div className="period-result-head">
                <div>
                  <span className="eyebrow dark">Fortune Reading</span>
                  <h2>{periodResult.title}</h2>
                </div>
                <strong>{periodResult.overallScore}<small>점</small></strong>
              </div>
              <p className="sign-summary">{periodResult.summary}</p>

              <div className="period-area-tabs">
                {areaOptions.map((area) => (
                  <button className={activeArea === area.id ? "active" : ""} key={area.id} onClick={() => setActiveArea(area.id)} type="button">
                    {area.label}
                    <span>{periodResult.fortunes[area.id].score}</span>
                  </button>
                ))}
              </div>

              <section className="period-selected-area">
                <span className="eyebrow dark">{periodResult.fortunes[activeArea].category}</span>
                <h3>{periodResult.fortunes[activeArea].headline}</h3>
                <p>{periodResult.fortunes[activeArea].detail}</p>
                <div><strong>실천 조언</strong>{periodResult.fortunes[activeArea].action}</div>
              </section>

              <div className="period-detail-grid">
                <section>
                  <strong>기간 흐름</strong>
                  {periodResult.timeFlow.map((item) => <p key={item.period}><b>{item.period}</b>{item.reading}</p>)}
                </section>
                <section>
                  <strong>행운 정보</strong>
                  <p><b>색상</b>{periodResult.lucky.color}</p>
                  <p><b>숫자</b>{periodResult.lucky.number}</p>
                  <p><b>방향</b>{periodResult.lucky.direction}</p>
                  <p><b>아이템</b>{periodResult.lucky.item}</p>
                </section>
              </div>
              <blockquote className="period-closing">{periodResult.closingMessage}</blockquote>
            </article>
          ) : (
            <aside className="fortune-sign-placeholder period-placeholder">
              <span>日月年</span>
              <strong>오늘부터 올해까지 원하는 기간의 흐름을 확인하세요.</strong>
              <p>총운, 애정운, 금전운, 직장운, 학업운, 성적운, 건강운을 함께 생성합니다.</p>
            </aside>
          )}
        </div>
      ) : mode === "cookie" ? (
        <article className="panel fortune-cookie-panel">
          <div className="fortune-cookie-copy">
            <span className="eyebrow dark">Fortune Cookie</span>
            <h2>오늘, 당신에게 도착한 한 문장</h2>
            <p>쿠키를 클릭하거나 손으로 터치해 깨뜨려 보세요.</p>
          </div>

          <button
            aria-label={cookieBroken ? "깨진 포춘쿠키" : "포춘쿠키 깨기"}
            className={`fortune-cookie ${cookieBroken ? "broken" : ""}`}
            disabled={loading || cookieBroken}
            onClick={crackCookie}
            type="button"
          >
            <span className="cookie-half left" />
            <span className="cookie-half right" />
            <span className="cookie-shadow" />
            <i className="crumb one" />
            <i className="crumb two" />
            <i className="crumb three" />
          </button>

          {!cookieBroken ? <strong className="cookie-prompt">눌러서 오늘의 운세를 확인하세요</strong> : null}
          {loading ? <LoaderCircle aria-label="운세 생성 중" className="spin cookie-loader" size={28} /> : null}
          {cookieResult ? (
            <div aria-live="polite" className="cookie-message">
              <span>오늘의 포춘</span>
              <blockquote>{cookieResult.message}</blockquote>
              <dl>
                <div><dt>행운의 단어</dt><dd>{cookieResult.luckyWord}</dd></div>
                <div><dt>오늘의 행동</dt><dd>{cookieResult.action}</dd></div>
              </dl>
              <button
                className="button primary"
                onClick={() => {
                  setCookieBroken(false);
                  setCookieResult(null);
                  setError("");
                }}
                type="button"
              >
                새 쿠키 열기
              </button>
            </div>
          ) : null}
          {error ? <p className="notice">{error}</p> : null}
        </article>
      ) : (
        <div className="fortune-sign-layout">
          <form className="panel fortune-sign-form" onSubmit={submitSignFortune}>
            <div className="section-head">
              <div>
                <span className="eyebrow dark">{mode === "animal" ? "Chinese Zodiac" : "Western Zodiac"}</span>
                <h2>{mode === "animal" ? "나의 띠별운세" : "나의 별자리운세"}</h2>
              </div>
              <Sparkles color="#a63d2e" size={28} />
            </div>

            <label className="field">
              이름 또는 닉네임
              <input className="input" maxLength={30} name="name" placeholder="결과에 표시할 이름" />
            </label>

            <label className="field">
              생년월일 <b className="required-mark">필수</b>
              <input className="input" max={new Date().toISOString().slice(0, 10)} name="birthDate" required type="date" />
            </label>

            {mode === "animal" ? (
              <fieldset className="fortune-required-group compact">
                <legend>입력한 생일의 달력 기준</legend>
                <div className="fortune-radio-cards two">
                  <label>
                    <input defaultChecked name="calendarType" type="radio" value="solar" />
                    양력
                  </label>
                  <label>
                    <input name="calendarType" type="radio" value="lunar" />
                    음력
                  </label>
                </div>
                <p className="field-help">양력 생일은 음력 새해 경계를 계산해 띠를 판별합니다.</p>
              </fieldset>
            ) : (
              <p className="field-help star-help">별자리는 양력 생일의 월·일을 기준으로 계산합니다.</p>
            )}

            <label className="field">
              성별
              <select className="input" defaultValue="unspecified" name="gender">
                <option value="unspecified">선택 안 함</option>
                <option value="female">여성</option>
                <option value="male">남성</option>
                <option value="other">기타</option>
              </select>
            </label>

            <label className="field">
              오늘 집중하고 싶은 일
              <textarea
                className="textarea"
                maxLength={240}
                name="currentFocus"
                placeholder="예: 이직 면접, 관계 회복, 시험 준비"
                rows={4}
              />
            </label>

            <button className="button primary wide" disabled={loading} type="submit">
              {loading ? <LoaderCircle className="spin" size={18} /> : <Sparkles size={18} />}
              AI {mode === "animal" ? "띠별" : "별자리"} 운세 생성
            </button>
            {error ? <p className="notice">{error}</p> : null}
            <p className="fortune-disclaimer">운세는 오락과 자기 성찰을 위한 참고 콘텐츠입니다.</p>
          </form>

          {signResult ? (
            <article aria-live="polite" className="panel fortune-sign-result">
              <div className="sign-result-symbol">{signResult.symbol}</div>
              <span className="eyebrow dark">{signResult.dateLabel}</span>
              <h2>{signResult.sign} · {signResult.headline}</h2>
              <p className="sign-summary">{signResult.summary}</p>
              <div className="sign-strengths">
                {signResult.strengths.map((strength) => <span key={strength}>{strength}</span>)}
              </div>
              <div className="sign-focus-grid">
                <div><strong>관계운</strong><p>{signResult.focus.love}</p></div>
                <div><strong>일·학업운</strong><p>{signResult.focus.work}</p></div>
                <div><strong>금전운</strong><p>{signResult.focus.money}</p></div>
                <div><strong>컨디션</strong><p>{signResult.focus.wellbeing}</p></div>
              </div>
              <dl className="fortune-lucky sign-lucky">
                <div><dt>행운 색</dt><dd>{signResult.lucky.color}</dd></div>
                <div><dt>행운 수</dt><dd>{signResult.lucky.number}</dd></div>
                <div><dt>행운 아이템</dt><dd>{signResult.lucky.item}</dd></div>
              </dl>
              <div className="sign-advice caution"><strong>주의</strong><p>{signResult.caution}</p></div>
              <div className="sign-advice"><strong>오늘의 행동</strong><p>{signResult.action}</p></div>
            </article>
          ) : (
            <aside className="fortune-sign-placeholder">
              <span>{mode === "animal" ? "十二支" : "✦"}</span>
              <strong>정보를 입력하면 나의 {mode === "animal" ? "띠" : "별자리"}를 계산합니다.</strong>
              <p>계산된 상징과 전통적 성향을 기준으로 오늘의 운세를 생성합니다.</p>
            </aside>
          )}
        </div>
      )}
    </section>
  );
}
