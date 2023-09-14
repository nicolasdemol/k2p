import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Search } from "./search";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Logo } from "../ui/logo";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const navigate = useNavigate();
  return (
    <nav {...props}>
      <NavigationMenu>
        <NavigationMenuList
          className={cn("flex items-center", className)}
        >
          <NavigationMenuItem>
            <div className="cursor-pointer">
              <Search>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {"Rechercher"}
                  <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-slate-100 px-1.5 text-[10px] font-medium text-slate-500 opacity-100">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </NavigationMenuLink>
              </Search>
            </div>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Production</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      to="/"
                    >
                      <Logo />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Intranet
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Système de communication et d'informations interne à
                        l'entreprise.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem to="/tasks" title="Planning">
                  Retrouver votre liste de tâches à réaliser.
                </ListItem>
                <ListItem to="/docs" title="Documents">
                  Bientôt disponible
                </ListItem>
                <ListItem to="/docs" title="Pointage">
                  Bientôt disponible
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              onClick={() => navigate("/admin")}
              className={cn("cursor-pointer", navigationMenuTriggerStyle())}
            >
              Administration
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <div>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </div>
    );
  }
);
ListItem.displayName = "ListItem";
