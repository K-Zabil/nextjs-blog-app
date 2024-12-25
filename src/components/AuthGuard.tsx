"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (status === "loading") return;
        if (!session && pathname !== "/auth/signin") {
            router.replace("/auth/signin");
        }
    }, [session, status, pathname, router]);

    if (!session && pathname !== "/auth/signin") return null;

    return <>{children}</>;
};

export default AuthGuard;