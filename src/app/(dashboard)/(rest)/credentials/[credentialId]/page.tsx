import { CredentialView } from "@/features/credentials/components/credentials";
import { requireAuth } from "@/lib/auth-utils";
import { Divide } from "lucide-react";
import { use } from "react";

interface CredentialPageProps {
  params: Promise<{
    credentialId: string;
  }>;
}

const Page: React.FC<CredentialPageProps> = async ({ params }) => {
  await requireAuth();
  const { credentialId } = await params;

  return (
    <div className="p-4 md:px-10 md:py-6 h-full">
      <div className="mx-auto max-w-md-screen w-full flex flex-col gap-y-8 h-full">
        <CredentialView credentialId={credentialId} />
      </div>
    </div>
  );
};

export default Page;
