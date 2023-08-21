import * as React from "react";

import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

const Logo: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({
  className,
  ...props
}) => (
  <img src={logo} alt="logo k2 process" className={cn(className)} {...props} />
);

Logo.displayName = "Logo";

export { Logo };
