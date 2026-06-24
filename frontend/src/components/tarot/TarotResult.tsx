"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { LoaderCircle, LockKeyhole, RotateCcw, Sparkles } from "lucide-react";
import { invokeEdgeApi } from "@/lib/edge-api";
import { getReadingType, getTarotCard, type TarotCard } from "@/lib/tarot";
import { TarotArtwork } from "@/components/tarot/TarotArtwork";

type TarotResultData = {
  title: string;
  summary: string;
  cardReadings: Array<{
    position: string;
    cardName: string;
    interpretation: string;
  }>;
  advice: string;
  caution: string;
};

type ApiResponse = {
  result: TarotResultData;
  saved: boolean;
  readingId: string | null;
  saveReason: "saved" | "login_required" | "payment_required" | "storage_unavailable";
};

export function TarotResult({
  type,
  cardIds,
  question,
}: {
  type?: string;
  cardIds: string[];
  question?: string;
}) {
  const readingType = getReadingType(type);
  const cards = useMemo(
    () => cardIds.map((id) => getTarotCard(id)).filter((card, index, all) => all.findIndex((item) => item.id === card.id) === index),
    [cardIds],
  );
  const [revealed, setRevealed] = useState<string[]>([]);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validSelection = cards.length === 3;
  const allRevealed = validSelection && revealed.length === 3;

  function reveal(card: TarotCard) {
    setRevealed((current) => (current.includes(card.id) ? current : [...current, card.id]));
  }

  async function generateResult() {
    if (!allRevealed || loading) return;
    setLoading(true);
    setError("");

    try {
      const body = await invokeEdgeApi<ApiResponse>("tarot-reading", {
          type: readingType.id,
          question: question?.slice(0, 300) ?? "",
          cards: cards.map(({ id, name, englishName, keyword, meaning, advice }) => ({
            id,
            name,
            englishName,
            keyword,
            meaning,
            advice,
          })),
      });
      setResult(body);
    } catch (reason) {
      setError(
        reason instanceof TypeError
          ? "타로 API에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요."
          : reason instanceof Error
            ? reason.message
            : "타로 결과를 생성하지 못했습니다.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (!validSelection) {
    return (
      <section className="panel tarot-invalid">
        <h1>카드 선택 정보가 올바르지 않습니다</h1>
        <p className="panel-copy">서로 다른 타로 카드 3장을 먼저 선택해 주세요.</p>
        <Link className="button primary" href="/tarot">
          카드 선택으로 돌아가기
        </Link>
      </section>
    );
  }

  return (
    <>
      {loading ? (
        <div aria-live="polite" aria-modal="true" className="tarot-loading-overlay" role="dialog">
          <div className="tarot-loading-card">
            <span aria-hidden="true" className="tarot-loading-spinner">
              <span>月</span>
            </span>
            <strong>세 장의 흐름을 해석하고 있습니다</strong>
            <p>AI가 카드의 연결과 질문을 분석하고 있습니다. 잠시만 기다려 주세요.</p>
            <div aria-hidden="true" className="tarot-loading-dots">
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      ) : null}

      <section className="reveal-intro">
        <span className="eyebrow">{readingType.title}</span>
        <h1>선택한 카드를 한 장씩 뒤집어 보세요</h1>
        <p>{question || readingType.question}</p>
      </section>

      <section className="reveal-grid" aria-label="선택한 타로 카드 공개">
        {cards.map((card, index) => {
          const isRevealed = revealed.includes(card.id);
          return (
            <button
              aria-label={isRevealed ? `${card.name}, 공개됨` : `${index + 1}번째 카드 뒤집기`}
              className={`reveal-card ${isRevealed ? "revealed" : ""}`}
              key={card.id}
              onClick={() => reveal(card)}
              type="button"
            >
              <span className="reveal-card-inner">
                <span className="card-back">
                  <span className="card-corner top-left">✦</span>
                  <span className="card-corner top-right">☾</span>
                  <span className="card-corner bottom-left">☽</span>
                  <span className="card-corner bottom-right">✦</span>
                  <i />
                  <b>月</b>
                  <em>{index + 1}번째 카드</em>
                </span>
                <span className={`card-front ${card.tone}`}>
                  <small>{index + 1}번째 카드</small>
                  <TarotArtwork card={card} />
                  <b>{card.name}</b>
                  <em>{card.keyword}</em>
                </span>
              </span>
            </button>
          );
        })}
      </section>

      {!result ? (
        <section className="generate-panel panel">
          <div>
            <span className="eyebrow dark">AI Tarot Reading</span>
            <h2>{allRevealed ? "세 장의 카드가 모두 공개되었습니다" : `${3 - revealed.length}장을 더 뒤집어 주세요`}</h2>
            <p className="panel-copy">모든 카드를 확인한 뒤 OpenAI가 세 카드의 연결된 흐름을 해석합니다.</p>
          </div>
          <button className="button primary" disabled={!allRevealed || loading} onClick={generateResult} type="button">
            {loading ? <LoaderCircle className="spin" size={18} /> : <Sparkles size={18} />}
            {loading ? "결과 생성 중..." : "AI 타로 결과 생성"}
          </button>
          {error ? <p className="notice">{error}</p> : null}
        </section>
      ) : null}

      {result ? (
        <section className="ai-result">
          <article className="panel ai-result-main">
            <span className="eyebrow dark">종합 결과</span>
            <h1>{result.result.title}</h1>
            <p className="result-summary">{result.result.summary}</p>
          </article>

          <div className="result-panels three">
            {result.result.cardReadings.map((reading, index) => (
              <article className="panel" key={`${reading.cardName}-${index}`}>
                <span className="eyebrow dark">{reading.position}</span>
                <h2>{reading.cardName}</h2>
                <p className="panel-copy">{reading.interpretation}</p>
              </article>
            ))}
          </div>

          <div className="result-panels">
            <article className="panel">
              <span className="eyebrow dark">행동 조언</span>
              <h2>이렇게 움직여보세요</h2>
              <p className="panel-copy">{result.result.advice}</p>
            </article>
            <article className="panel">
              <span className="eyebrow dark">주의할 점</span>
              <h2>이 부분은 신중하게</h2>
              <p className="panel-copy">{result.result.caution}</p>
            </article>
          </div>

          <div className={`save-status ${result.saved ? "saved" : ""}`}>
            <LockKeyhole size={18} />
            {result.saved
              ? "로그인 및 결제 상태가 확인되어 이 결과를 내 상담 기록에 저장했습니다."
              : result.saveReason === "login_required"
                ? "로그인하지 않아 결과는 저장되지 않았습니다. 로그인 및 결제 완료 사용자만 결과가 저장됩니다."
                : result.saveReason === "payment_required"
                  ? "결제 권한이 확인되지 않아 결과는 저장되지 않았습니다."
                  : "저장 서버가 설정되지 않아 결과는 화면에만 표시됩니다."}
          </div>
        </section>
      ) : null}

      <div className="button-row result-actions">
        <Link className="button glass" href="/tarot">
          <RotateCcw size={18} />
          다시 뽑기
        </Link>
        <Link className="button primary" href="/dashboard">
          내 상담 기록
        </Link>
        <Link className="button glass" href="/consultation">
          상담 신청
        </Link>
      </div>
    </>
  );
}
