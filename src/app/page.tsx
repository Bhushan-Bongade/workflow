import { caller } from "@/trpc/server";
import LogoutButton from "./features/auth/components/logout-button";
import { requireAuth } from "@/lib/auth-utils";

const Page = async () => {
  await requireAuth();
  const data = await caller.getUsers();

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      {data && (
        <>
          <LogoutButton />
        </>
      )}
    </div>
  );
};

export default Page;
