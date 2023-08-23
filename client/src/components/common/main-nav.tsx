import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Search } from "./search";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {

  const { user } = useAuth()
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Search />
      <Link
        to="/tasks"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Planning
      </Link>
      <Link
        to="/messages"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Messages
      </Link>
      <Link
        to="/docs"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Documents
      </Link>
      {user && user.role === "admin" && (
        <Link
          to="/admin"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Administration
        </Link>
      )}
    </nav>
  );
}
