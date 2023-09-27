import { NavBar } from "@/components/common/navbar";
import { Toaster } from "@/components/ui/toaster";

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <main className="relative h-[calc(100vh-57px)]">
        {children}
      </main>
      <Toaster />
    </>
  );
};

export { Layout };
