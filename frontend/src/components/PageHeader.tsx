import Link from "next/link";
import { brand } from "@/lib/site";

export function PageHeader() {
  return (
    <header className="appbar inline">
      <Link className="brand-mark" href="/">
        <span>{brand.name}</span>
      </Link>
      <nav className="nav" aria-label="주요 메뉴">
        <Link className="nav-link" href="/saju">
          정통사주
        </Link>
        <Link className="nav-link" href="/consultation">
          상담
        </Link>
        <Link className="nav-link" href="/tarot">
          타로
        </Link>
        <Link className="nav-link" href="/dashboard">
          MY
        </Link>
      </nav>
    </header>
  );
}
