import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient, hasSupabaseServerEnv } from "@/lib/supabase/server";
import { UploadForm } from "@/components/UploadForm";
import { PageHeader } from "@/components/PageHeader";

export default async function UploadPage() {
  let userId = "local-preview-user";

  if (hasSupabaseServerEnv()) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();

    if (!data?.claims?.sub) {
      redirect("/");
    }

    userId = String(data.claims.sub);
  }

  return (
    <main className="page-shell dashboard">
      <PageHeader />

      <section className="panel">
        <span className="eyebrow dark">Attachment</span>
        <h1>상담 이미지 업로드</h1>
        <p className="panel-copy">손금, 사주 메모, 타로 배열처럼 풀이에 필요한 이미지를 첨부합니다.</p>
        <UploadForm userId={userId} />
        <div className="button-row spaced">
          <Link className="button glass dark wide" href="/consultation">
            상담 정보 수정
          </Link>
          <Link className="button primary wide" href="/dashboard">
            MY로 이동
          </Link>
        </div>
      </section>
    </main>
  );
}
