"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./Breadcrumbs.module.css";

const breadcrumbLabels: Record<string, string> = {
  diary: "Щоденник",
  journey: "Подорож",
  profile: "Профіль",
  edit: "Редагування",
  auth: "Авторизація",
  login: "Вхід",
  register: "Реєстрація",
};

export default function Breadcrumbs() {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(Boolean);

  const breadcrumbs = [
    { label: "Мій день", href: "/" },
    ...pathSegments.map((segment, index) => {
      const href = `/${pathSegments.slice(0, index + 1).join("/")}`;

      return {
        label: breadcrumbLabels[segment] ?? segment,
        href,
      };
    }),
  ];

  return (
    <nav aria-label="Breadcrumbs" className={css.breadcrumbs}>
      <ol className={css.list}>
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={breadcrumb.href} className={css.item}>
              {isLast ? (
                <span className={css.current}>{breadcrumb.label}</span>
              ) : (
                <>
                  <Link href={breadcrumb.href} className={css.link}>
                    {breadcrumb.label}
                  </Link>
                  <span className={css.separator}>/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
