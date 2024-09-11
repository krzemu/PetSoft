"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type RouteProps = {
  label: string;
  path: string;
};

type AppNavProps = {
  routes: RouteProps[];
};

export default function AppNav({ routes }: AppNavProps) {
  const path = usePathname();

  return (
    <nav>
      <ul className="flex gap-2 text-xs">
        {routes.map((route) => (
          <li key={route.label + route.path}>
            <Link
              href={route.path}
              className={cn(
                `text-white/70  rounded-sm px-2 py-1 hover:text-white transition focus:text-white`,
                {
                  "bg-black/10": path === route.path,
                  "text-white": path === route.path,
                }
              )}>
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
