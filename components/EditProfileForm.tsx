"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import type { Member } from "@/lib/generated/prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  primaryPhone: z.string().min(7, "Required"),
  emergencyContactName: z.string().min(1, "Required"),
  emergencyContactPhone: z.string().min(7, "Required"),
  emergencyContactRelationship: z.string().min(1, "Required"),
  insuranceProvider: z.string().optional(),
  insurancePolicyNumber: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function EditProfileForm({ member }: { member: Member }) {
  const router = useRouter();
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: member.firstName,
      lastName: member.lastName,
      primaryPhone: member.primaryPhone,
      emergencyContactName: member.emergencyContactName,
      emergencyContactPhone: member.emergencyContactPhone,
      emergencyContactRelationship: member.emergencyContactRelationship,
      insuranceProvider: member.insuranceProvider ?? "",
      insurancePolicyNumber: member.insurancePolicyNumber ?? "",
    },
  });

  async function onSubmit(data: FormData) {
    setError("");
    const res = await fetch(`/api/members/${member.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/profile");
      router.refresh();
    } else {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Failed to save changes.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Personal Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {([["firstName", "First Name"], ["lastName", "Last Name"], ["primaryPhone", "Phone Number"]] as const).map(([field, label]) => (
            <div key={field} className="space-y-2">
              <Label htmlFor={field}>{label}</Label>
              <Input id={field} {...register(field)} />
              {errors[field] && <p className="text-sm text-red-500">{errors[field]?.message}</p>}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Emergency Contact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="emergencyContactName">Contact Name</Label>
            <Input id="emergencyContactName" {...register("emergencyContactName")} />
            {errors.emergencyContactName && <p className="text-sm text-red-500">{errors.emergencyContactName.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergencyContactPhone">Contact Phone</Label>
            <Input id="emergencyContactPhone" type="tel" {...register("emergencyContactPhone")} />
            {errors.emergencyContactPhone && <p className="text-sm text-red-500">{errors.emergencyContactPhone.message}</p>}
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="emergencyContactRelationship">Relationship</Label>
            <Input id="emergencyContactRelationship" {...register("emergencyContactRelationship")} />
            {errors.emergencyContactRelationship && <p className="text-sm text-red-500">{errors.emergencyContactRelationship.message}</p>}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1 border-b pb-2">
          Insurance <span className="text-sm font-normal text-gray-500">(optional)</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="insuranceProvider">Insurance Provider</Label>
            <Input id="insuranceProvider" {...register("insuranceProvider")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="insurancePolicyNumber">Policy Number</Label>
            <Input id="insurancePolicyNumber" {...register("insurancePolicyNumber")} />
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-3">
        <Button type="submit" className="bg-teal-600 hover:bg-teal-700" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/profile")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
