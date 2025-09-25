import { ReactNode } from "react";

export const ProgressList = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <ul
      className={`ml-2.5 grid list-none gap-2 border-l-3 border-gray-500 p-0 ${className}`}
    >
      {children}
    </ul>
  );
};

export const ProgressListItem = ({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <li
      style={style}
      className={`relative pl-4 after:absolute after:-top-1.5 after:-left-3.25 after:mt-1.5 after:mr-2 after:block after:h-6 after:w-6 after:rounded-full after:border-2 after:border-(--progressColor) after:bg-(--progressBgColor) after:content-[''] ${className}`}
    >
      {children}
    </li>
  );
};
