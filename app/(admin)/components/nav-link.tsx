"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IProp {
  className?: string;
  href: string;
  active?: string;
  target?: string;
  targetPath?: string;
  rel?: string;
  children: React.ReactNode;
  onClick?: () => void;
  isAccordion?: boolean;
  isSubAccordion?: boolean;
  isProfessionalPlanRoute?: boolean;
}
export default function NavLink({
  className,
  href,
  active,
  target,
  rel,
  children,
  onClick,
  targetPath,
  isAccordion,
  isSubAccordion,
  isProfessionalPlanRoute = false,
}: IProp) {
  const pathName = usePathname();

  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={cn(
        "relative flex items-center",
        {
          "sub-menu-active":
            (active ||
              (!active && pathName === href) ||
              (targetPath && pathName.startsWith(targetPath))) &&
            (isAccordion || isSubAccordion),

          active:
            (active ||
              (!active && pathName === href) ||
              (targetPath && pathName.startsWith(targetPath))) &&
            !(isAccordion || isSubAccordion),
        },
        "nav-item",
        className
      )}
      onClick={onClick && onClick}
    >
      {children}
      {isAccordion && (
        <div className="absolute -left-5 top-3 flex flex-col items-center gap-1">
          <div
            className={cn(
              "size-[5px] rounded-full bg-gray-700/50",
              pathName === href && "bg-primary"
            )}
          ></div>
          <div className="h-7 w-px rounded-full bg-gray-300"></div>
        </div>
      )}
    </Link>
  );
}
