"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
          <li key={route.label + route.path} className="relative">
            <Link
              href={route.path}
              className={cn(
                `text-white/70  rounded-sm px-2 py-1 hover:text-white transition focus:text-white`,
                {
                  "text-white": path === route.path,
                }
              )}>
              {route.label}
            </Link>
            {path === route.path && (
              <motion.div
                layoutId="active-nav"
                className="absolute inset-0 m-auto h-full bg-black/10 rounded-md py-3"
                initial={false}
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
