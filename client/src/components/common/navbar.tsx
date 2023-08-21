import { MainNav } from "@/components/common/main-nav";
import { UserNav } from "@/components/common/user-nav";
import { Search } from "@/components/common/search";
import { Logo } from "@/components/ui/logo";

const NavBar = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Logo className="h-1/3" />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <UserNav />
        </div>
      </div>
    </div>
  );
};

export { NavBar };
