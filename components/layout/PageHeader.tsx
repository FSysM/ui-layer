import { ReactNode } from "react";

export default function PageHeader({title, actions,}: {
  title: string; actions?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-2">
      <h1 className="text-3xl font-bold">{title}</h1>
      <div>{actions}</div>
    </div>
  );
}
