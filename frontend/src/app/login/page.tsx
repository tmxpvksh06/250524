import { AuthPanel } from "@/components/AuthPanel";
import { PageHeader } from "@/components/PageHeader";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="page-shell auth-page">
      <PageHeader />
      <section className="auth-layout">
        <div className="consult-hero">
          <span className="eyebrow">Account</span>
          <h1>로그인</h1>
          <p>회원가입 또는 카카오 로그인을 통해 상담 신청과 이미지 업로드를 이어갈 수 있습니다.</p>
          <div className="auth-note">
            처음 방문했다면 <Link href="/signup">회원가입</Link>을 먼저 진행하세요.
          </div>
        </div>
        <AuthPanel />
      </section>
    </main>
  );
}
