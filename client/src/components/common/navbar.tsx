import { MainNav } from "@/components/common/main-nav";
import { UserNav } from "@/components/common/user-nav";
import { Logo } from "@/components/ui/logo";

const NavBar = () => {
  return (
    <div className="sticky top-0 bg-white z-50">
      <div className="flex h-14 items-center px-4">
        <Logo className="w-24 cursor-pointer" />
        <MainNav className="ml-4" />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </div>
  );
};

export { NavBar };
