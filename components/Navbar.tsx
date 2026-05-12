import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import NavbarClient from "@/components/NavbarClient";

export default async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let isAdmin = false;
  let isConvener = false;

  if (user?.email) {
    const member = await db.member.findUnique({
      where: { email: user.email },
      select: { isAdmin: true, isConvener: true },
    });
    isAdmin = member?.isAdmin ?? false;
    isConvener = member?.isConvener ?? false;
  }

  return (
    <NavbarClient
      userEmail={user?.email}
      isAdmin={isAdmin}
      isConvener={isConvener}
    />
  );
}
