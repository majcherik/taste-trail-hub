
import { Navbar } from "./Navbar";
import { BottomNav } from "./BottomNav";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  hideBottomNav?: boolean;
}

export const Layout = ({ children, hideBottomNav = false }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={`flex-1 container py-6 ${!hideBottomNav ? 'mb-16 md:mb-0' : ''}`}>
        {children}
      </main>
      {!hideBottomNav && <BottomNav />}
    </div>
  );
};
