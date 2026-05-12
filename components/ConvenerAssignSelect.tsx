"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

interface Convener {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface Props {
  memberId: string;
  currentConvenerEmail: string | null;
  conveners: Convener[];
}

export default function ConvenerAssignSelect({ memberId, currentConvenerEmail, conveners }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setError(null);
    const value = e.target.value || null;
    const res = await fetch(`/api/admin/members/${memberId}/convener`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ convenerEmail: value }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed");
      return;
    }
    startTransition(() => router.refresh());
  }

  return (
    <div className="flex flex-col gap-1">
      <select
        defaultValue={currentConvenerEmail ?? ""}
        onChange={handleChange}
        disabled={pending}
        className="text-xs border rounded px-2 py-1 text-gray-700 bg-white disabled:opacity-50 max-w-[160px]"
      >
        <option value="">— unassigned —</option>
        {conveners.map((c) => (
          <option key={c.id} value={c.email}>
            {c.firstName} {c.lastName}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
