import { ReactNode } from "react";

export const StatusBadge = ({ children }: { children: ReactNode }) => {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-md bg-(--progressBgColor) px-2 py-1 text-xs font-medium text-(--progressColor) ring-1 ring-(--progressColor)/10 ring-inset`}
    >
      {children}
    </span>
  );
};
