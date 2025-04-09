
import { Navbar } from "./Navbar";
import { BottomNav } from "./BottomNav";
import { ReactNode } from "react";
import { UnitToggle } from "@/components/UnitToggle";

interface LayoutProps {
  children: ReactNode;
  hideBottomNav?: boolean;
  showUnitToggle?: boolean;
}

export const Layout = ({ 
  children, 
  hideBottomNav = false,
  showUnitToggle = false
}: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={`flex-1 container py-6 ${!hideBottomNav ? 'mb-16 md:mb-0' : ''}`}>
        {showUnitToggle && (
          <div className="flex justify-end mb-4">
            <UnitToggle />
          </div>
        )}
        {children}
      </main>
      {!hideBottomNav && <BottomNav />}
    </div>
  );
};
