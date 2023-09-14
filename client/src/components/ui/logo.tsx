import * as React from "react";

import logo from "@/assets/logo.png";
import { useNavigate } from "react-router-dom";

const Logo: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({
  ...props
}) => {
  const navigate = useNavigate();
  return (
    <img
      onClick={() => navigate("/")}
      src={logo}
      alt="logo k2 process"
      {...props}
    />
  );
};

Logo.displayName = "Logo";

export { Logo };
