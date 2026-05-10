import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import EditProfileForm from "@/components/EditProfileForm";

export const metadata: Metadata = { title: "Edit Profile | SWCA" };

export default async function EditProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const member = await db.member.findUnique({ where: { email: user.email! } });
  if (!member) redirect("/join");

  return (
    <div className="py-16 px-4">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Profile</h1>
        <EditProfileForm member={member} />
      </div>
    </div>
  );
}
