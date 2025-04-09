
import { Navbar } from "./Navbar";
import { BottomNav } from "./BottomNav";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-6 mb-16 md:mb-0">{children}</main>
      <BottomNav />
    </div>
  );
};
