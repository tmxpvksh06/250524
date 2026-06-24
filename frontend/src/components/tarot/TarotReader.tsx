"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { RotateCcw, Sparkles, X } from "lucide-react";
import { tarotCards, tarotReadingTypes, type TarotCard, type TarotReadingType } from "@/lib/tarot";

const MAX_SELECTION = 3;

export function TarotReader() {
  const router = useRouter();
  const [readingType, setReadingType] = useState<TarotReadingType>("today");
  const [question, setQuestion] = useState("");
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  const [shuffleKey, setShuffleKey] = useState(0);

  const spread = useMemo(() => {
    const offset = (shuffleKey * 17) % tarotCards.length;
    return [...tarotCards.slice(offset), ...tarotCards.slice(0, offset)];
  }, [shuffleKey]);

  function resetReading(nextType?: TarotReadingType) {
    setSelectedCards([]);
    setShuffleKey((key) => key + 1);
    if (nextType) setReadingType(nextType);
  }

  function toggleCard(card: TarotCard) {
    setSelectedCards((current) => {
      if (current.some((item) => item.id === card.id)) {
        return current.filter((item) => item.id !== card.id);
      }
      if (current.length >= MAX_SELECTION) return current;
      return [...current, card];
    });
  }

  function openRevealPage() {
    if (selectedCards.length !== MAX_SELECTION) return;
    const params = new URLSearchParams({
      type: readingType,
      cards: selectedCards.map((card) => card.id).join(","),
    });
    if (question.trim()) params.set("question", question.trim());
    router.push(`/tarot/result?${params.toString()}`);
  }

  return (
    <section className="tarot-reader">
      <div className="tarot-panel">
        <div className="section-head">
          <div>
            <span className="eyebrow">Tarot Reading</span>
            <h2>항목을 고르고 카드 3장을 선택하세요</h2>
          </div>
          <button className="button glass" onClick={() => resetReading()} type="button">
            <RotateCcw size={18} />
            다시 섞기
          </button>
        </div>

        <div className="reading-tabs" role="tablist" aria-label="타로 리딩 종류">
          {tarotReadingTypes.map((type) => (
            <button
              className={`reading-tab ${readingType === type.id ? "active" : ""}`}
              key={type.id}
              onClick={() => resetReading(type.id)}
              type="button"
            >
              <strong>{type.title}</strong>
              <span>{type.subtitle}</span>
            </button>
          ))}
        </div>

        <label className="field tarot-question-field">
          구체적인 질문 (선택)
          <textarea
            className="textarea"
            maxLength={300}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder={tarotReadingTypes.find((type) => type.id === readingType)?.question}
            rows={3}
            value={question}
          />
        </label>

        <div className="tarot-question">
          뒷면이 보이는 78장 중 마음이 가는 카드 3장을 고르세요. ({selectedCards.length}/3)
        </div>

        <div className="tarot-spread" aria-label="타로 카드 78장 선택">
          {spread.map((card, index) => {
            const selectedIndex = selectedCards.findIndex((item) => item.id === card.id);
            const selected = selectedIndex >= 0;
            return (
              <button
                aria-label={selected ? `${selectedIndex + 1}번째 선택 카드 취소` : `${index + 1}번째 카드 선택`}
                className={`tarot-card ${selected ? "selected" : ""}`}
                disabled={!selected && selectedCards.length >= MAX_SELECTION}
                key={`${card.id}-${shuffleKey}`}
                onClick={() => toggleCard(card)}
                style={{ "--delay": `${Math.min(index * 12, 500)}ms` } as CSSProperties}
                type="button"
              >
                <span className="card-back">
                  <span className="card-corner top-left">✦</span>
                  <span className="card-corner top-right">☾</span>
                  <span className="card-corner bottom-left">☽</span>
                  <span className="card-corner bottom-right">✦</span>
                  <i />
                  <b>{selected ? selectedIndex + 1 : "月"}</b>
                  <em>{selected ? "SELECTED" : "WMD"}</em>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <aside className="tarot-selected">
        <span className="eyebrow">Selected Cards</span>
        <h2>{selectedCards.length === 3 ? "선택을 완료했습니다" : "카드 3장을 고르세요"}</h2>
        <p>선택 단계에서는 카드 내용이 공개되지 않습니다. 다음 페이지에서 한 장씩 직접 뒤집어 확인합니다.</p>
        <div className="selected-card-list">
          {[0, 1, 2].map((position) => {
            const card = selectedCards[position];
            return (
              <div className="selected-card-slot" key={position}>
                <span>{position + 1}</span>
                <strong>{card ? `${position + 1}번째 카드 선택됨` : "미선택"}</strong>
                {card ? (
                  <button aria-label={`${position + 1}번째 카드 선택 취소`} onClick={() => toggleCard(card)} type="button">
                    <X size={16} />
                  </button>
                ) : null}
              </div>
            );
          })}
        </div>
        <button
          className="button primary wide"
          disabled={selectedCards.length !== MAX_SELECTION}
          onClick={openRevealPage}
          type="button"
        >
          <Sparkles size={18} />
          선택한 카드 확인하기
        </button>
      </aside>
    </section>
  );
}
