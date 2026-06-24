import Link from "next/link";
import { ImageUp, NotebookPen } from "lucide-react";
import { redirect } from "next/navigation";
import { createClient, hasSupabaseServerEnv } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/SignOutButton";
import { services } from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";

export default async function DashboardPage() {
  let email = "로컬 테스트 회원";

  if (hasSupabaseServerEnv()) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();

    if (!data?.claims) {
      redirect("/");
    }

    email = typeof data.claims.email === "string" ? data.claims.email : "회원";
  }

  return (
    <main className="page-shell dashboard">
      <PageHeader />

      <section className="dashboard-head">
        <span className="eyebrow">My Page</span>
        <h1>대시보드</h1>
        <p>{email} 계정으로 로그인되어 있습니다.</p>
        <div className="grid">
          <div className="metric">
            상담 요청
            <strong>0</strong>
          </div>
          <div className="metric">
            업로드 이미지
            <strong>0</strong>
          </div>
          <div className="metric">
            진행 상태
            <strong>준비</strong>
          </div>
        </div>
        <div className="quick-actions">
          <Link className="button primary" href="/consultation">
            <NotebookPen size={18} />
            상담 신청
          </Link>
          <Link className="button glass" href="/upload">
            <ImageUp size={18} />
            이미지 업로드
          </Link>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-head compact">
          <div>
            <span className="eyebrow">Recent</span>
            <h2>최근 상담</h2>
          </div>
        </div>
        <div className="request-list">
          {services.map((service) => (
            <article className="request-item" key={service.slug}>
              <span>{service.badge}</span>
              <div>
                <strong>{service.title}</strong>
                <p>{service.guideName} 담당 풀이가 준비되면 이곳에 표시됩니다.</p>
              </div>
              <Link href={`/${service.slug}`}>보기</Link>
            </article>
          ))}
        </div>
        <div className="quick-actions">
          <SignOutButton />
        </div>
      </section>
    </main>
  );
}
