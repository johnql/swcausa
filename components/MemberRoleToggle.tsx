"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

interface Props {
  memberId: string;
  isAdmin: boolean;
  isConvener: boolean;
}

export default function MemberRoleToggle({ memberId, isAdmin, isConvener }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function toggle(field: "isAdmin" | "isConvener", current: boolean) {
    setError(null);
    const res = await fetch(`/api/admin/members/${memberId}/role`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: !current }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed");
      return;
    }
    startTransition(() => router.refresh());
  }

  return (
    <div className="flex items-center gap-2">
      <RoleChip
        label="Admin"
        active={isAdmin}
        disabled={pending}
        onClick={() => toggle("isAdmin", isAdmin)}
      />
      <RoleChip
        label="Convener"
        active={isConvener}
        disabled={pending}
        onClick={() => toggle("isConvener", isConvener)}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

function RoleChip({
  label,
  active,
  disabled,
  onClick,
}: {
  label: string;
  active: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-xs px-2 py-0.5 rounded-full border font-medium transition-colors disabled:opacity-50 ${
        active
          ? "bg-teal-600 text-white border-teal-600 hover:bg-teal-700"
          : "bg-white text-gray-500 border-gray-300 hover:border-teal-400 hover:text-teal-600"
      }`}
    >
      {label}
    </button>
  );
}
