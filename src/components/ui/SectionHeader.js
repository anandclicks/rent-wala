import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Shared heading row for every content section: title, subtitle, optional "View all". */
export default function SectionHeader({
  title,
  subtitle,
  href,
  linkLabel = "View all",
  linkClassName = "",
  as: Tag = "h2",
  className = "",
}) {
  return (
    <div className={`flex items-end justify-between gap-4 ${className}`}>
      <div className="min-w-0">
        <Tag className="section-title">{title}</Tag>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </div>
      {href && (
        <Link href={href} className={`link group shrink-0 text-sm ${linkClassName}`}>
          {linkLabel}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
