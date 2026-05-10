// TODO: add convener/admin role check and sidebar nav
import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export default function DashboardLayout({ title, children }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{title}</h1>
        {children}
      </div>
    </div>
  );
}
