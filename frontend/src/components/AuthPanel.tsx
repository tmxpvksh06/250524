"use client";

import { FormEvent, useState } from "react";
import { LogIn, MessageCircle, UserPlus } from "lucide-react";
import { createClient, hasSupabaseBrowserEnv } from "@/lib/supabase/client";

type Mode = "signin" | "signup";

export function AuthPanel({ initialMode = "signin" }: { initialMode?: Mode }) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const isConfigured = hasSupabaseBrowserEnv();

  async function handlePasswordAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isConfigured) {
      setMessage("Supabase 환경변수를 설정하면 인증이 활성화됩니다.");
      return;
    }

    const supabase = createClient();
    setLoading(true);
    setMessage("");

    const redirectTo = `${window.location.origin}/auth/callback`;
    const result =
      mode === "signup"
        ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: redirectTo } })
        : await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    if (mode === "signup") {
      setMessage("가입 확인 메일을 확인해주세요.");
      return;
    }

    window.location.href = "/dashboard";
  }

  async function handleKakaoLogin() {
    if (!isConfigured) {
      setMessage("Supabase Kakao provider 설정 후 사용할 수 있습니다.");
      return;
    }

    const supabase = createClient();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setLoading(false);
      setMessage(error.message);
    }
  }

  return (
    <section className="panel" aria-label="로그인">
      <h2>회원 시작</h2>
      <div className="tabs" role="tablist" aria-label="인증 방식">
        <button className={`tab ${mode === "signin" ? "active" : ""}`} onClick={() => setMode("signin")} type="button">
          로그인
        </button>
        <button className={`tab ${mode === "signup" ? "active" : ""}`} onClick={() => setMode("signup")} type="button">
          회원가입
        </button>
      </div>

      <form className="form" onSubmit={handlePasswordAuth}>
        <label className="field">
          이메일
          <input className="input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <label className="field">
          비밀번호
          <input
            className="input"
            type="password"
            value={password}
            minLength={6}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <button className="button primary" disabled={loading} type="submit">
          {mode === "signup" ? <UserPlus size={18} /> : <LogIn size={18} />}
          {mode === "signup" ? "일반 회원가입" : "로그인"}
        </button>
      </form>

      <div className="divider">또는</div>

      <button className="button kakao" disabled={loading} onClick={handleKakaoLogin} type="button">
        <MessageCircle size={18} />
        카카오톡으로 계속하기
      </button>

      <div className="notice" role="status">
        {message || (!isConfigured ? "로컬 UI 테스트 모드입니다. Supabase 키를 넣으면 실제 인증이 연결됩니다." : "")}
      </div>
    </section>
  );
}
