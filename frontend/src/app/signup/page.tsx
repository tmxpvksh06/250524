import Link from "next/link";
import { AuthPanel } from "@/components/AuthPanel";
import { PageHeader } from "@/components/PageHeader";

export default function SignupPage() {
  return (
    <main className="page-shell auth-page">
      <PageHeader />
      <section className="auth-layout">
        <div className="consult-hero">
          <span className="eyebrow">Join</span>
          <h1>회원가입</h1>
        <p>야르렁당 계정을 만들고 정통 사주와 타로 상담 기록을 이어서 관리하세요.</p>
          <div className="auth-note">
            이미 계정이 있다면 <Link href="/login">로그인</Link>으로 이동하세요.
          </div>
        </div>
        <AuthPanel initialMode="signup" />
      </section>
    </main>
  );
}
