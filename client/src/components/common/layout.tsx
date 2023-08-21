import { NavBar } from "@/components/common/navbar";
import { Toaster } from "@/components/ui/toaster";

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Toaster />
    </>
  );
};

export { Layout };
