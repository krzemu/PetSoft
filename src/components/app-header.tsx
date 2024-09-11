import Logo from "./logo";
import AppNav from "./app-nav";

const routes = [
  {
    label: "Dashboard",
    path: "/app/dashboard",
  },
  {
    label: "Account",
    path: "/app/account",
  },
];

export default function AppHeader() {
  return (
    <header className="flex justify-between items-center border-b border-white/10 py-2">
      <Logo />
      <AppNav routes={routes} />
    </header>
  );
}
