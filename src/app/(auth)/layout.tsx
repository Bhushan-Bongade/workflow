"use Client";

import Image from "next/image";
import Link from "next/link";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="bg-muted flex min-h-dvh min-w-dvw flex-col justify-center items-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col justify-center gap-6">
        <Link href={"/"} className="flex justify-center">
          <Image
            alt="Workflow"
            width={100}
            height={50}
            src={"/logos/logo.svg"}
          />
        </Link>
        {children}
      </div>
    </div>
  );
};

export default Layout;
