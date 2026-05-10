"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { serviceStates } from "@/data/states";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email address"),
  primaryPhone: z.string().min(7, "Phone number is required"),
  gender: z.enum(["Male", "Female", "Other"], { error: "Please select a gender" }),
  state: z.enum(["MA", "NH", "RI", "VT"], { error: "Please select your state" }),
  emergencyContactName: z.string().min(1, "Emergency contact name is required"),
  emergencyContactPhone: z.string().min(7, "Emergency contact phone is required"),
  emergencyContactRelationship: z.string().min(1, "Relationship is required"),
  insuranceProvider: z.string().optional(),
  insurancePolicyNumber: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function MembershipForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setError("");
    const res = await fetch("/api/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setSubmitted(true);
    } else {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Something went wrong. Please try again.");
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-16 bg-teal-50 rounded-2xl">
        <p className="text-3xl font-bold text-teal-800 mb-3">Welcome to SWCA!</p>
        <p className="text-gray-600 max-w-sm mx-auto">
          Thank you for joining. A local convener from your neighborhood will call you soon to welcome you personally.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

      {/* Personal Info */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Personal Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" {...register("firstName")} />
            {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" {...register("lastName")} />
            {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="primaryPhone">Phone Number</Label>
            <Input id="primaryPhone" type="tel" {...register("primaryPhone")} />
            {errors.primaryPhone && <p className="text-sm text-red-500">{errors.primaryPhone.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>Gender</Label>
            <Select onValueChange={(v) => setValue("gender", v as "Male" | "Female" | "Other")}>
              <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && <p className="text-sm text-red-500">{errors.gender.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>State</Label>
            <Select onValueChange={(v) => setValue("state", v as "MA" | "NH" | "RI" | "VT")}>
              <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
              <SelectContent>
                {serviceStates.map((s) => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.state && <p className="text-sm text-red-500">{errors.state.message}</p>}
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
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
            <Input id="emergencyContactRelationship" placeholder="e.g. Daughter, Friend, Neighbor" {...register("emergencyContactRelationship")} />
            {errors.emergencyContactRelationship && <p className="text-sm text-red-500">{errors.emergencyContactRelationship.message}</p>}
          </div>
        </div>
      </div>

      {/* Insurance (optional) */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1 border-b pb-2">
          Insurance Information <span className="text-sm font-normal text-gray-500">(optional)</span>
        </h2>
        <p className="text-xs text-gray-500 mb-4">Stored only for emergency reference — not used for billing.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="insuranceProvider">Insurance Provider</Label>
            <Input id="insuranceProvider" placeholder="e.g. Blue Cross" {...register("insuranceProvider")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="insurancePolicyNumber">Policy Number</Label>
            <Input id="insurancePolicyNumber" {...register("insurancePolicyNumber")} />
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" size="lg" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Complete Registration"}
      </Button>
    </form>
  );
}
