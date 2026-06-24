import Image from "next/image";
import Link from "next/link";

type ServiceCardProps = {
  slug: string;
  title: string;
  guideName: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
};

export function ServiceCard({ slug, title, guideName, subtitle, description, image, badge }: ServiceCardProps) {
  return (
    <Link className="service-card" id={slug} href={`/${slug}`}>
      <Image src={image} alt="" fill sizes="(max-width: 820px) 50vw, 260px" />
      <div className="service-shade" />
      <span className="service-badge">{badge}</span>
      <div className="service-copy">
        <em>{guideName}</em>
        <strong>{title}</strong>
        <span>{subtitle}</span>
        <p>{description}</p>
      </div>
    </Link>
  );
}
