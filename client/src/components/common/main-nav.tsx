import * as React from "react";
import { useNavigate } from "react-router-dom";
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
import { Folders, History } from "lucide-react";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const navigate = useNavigate();
  return (
    <nav {...props}>
      <NavigationMenu>
        <NavigationMenuList className={cn("flex items-center", className)}>
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
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[400px] ">
                <ListItem href="/issues" icon={<History className="mr-1 h-5 w-5" />} title="Historique des problèmes">
                  
                  Consulter l'historique des problèmes signalés.
                </ListItem>
                <ListItem href="/docs" icon={<Folders className="mr-1 h-5 w-5" />} title="Documents partagés">
                  Rechercher rapidement un fichier spécifique.
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

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, icon, ...props }, ref) => {
  const navigate = useNavigate();
  return (
    <li>
      <NavigationMenuLink asChild>
        <div
          onClick={() => navigate(href)}
          ref={ref}
          className={cn(
            "block cursor-pointer select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none inline-flex items-center">{icon}{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </div>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
