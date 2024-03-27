import React from "react";

const sizes = {
  "2xl": "text-3xl font-bold leading-9",
  xl: "text-[22px] font-bold leading-[27px]",
  s: "text-xs font-bold leading-[15px]",
  md: "text-sm font-bold leading-[17px]",
  xs: "text-[10px] font-bold leading-3",
  lg: "text-base font-bold leading-5",
};

const Heading = ({
  children,
  className = "",
  size = "md",
  as,
  ...restProps
}) => {
  const Component = as || "h6";

  return (
    <Component
      className={` text-gray-900 ${className} ${sizes[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Heading };
