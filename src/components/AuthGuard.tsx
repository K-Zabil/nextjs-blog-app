"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (status === "loading") return;
        if (!session && pathname !== "/auth/signin" && pathname !== "/auth/signup" && pathname !== "/auth/error") router.replace("/auth/signin");
    }, [session, status, pathname, router]);
    if (status === "loading") return <div>Loading...</div>;
    if (!session && pathname !== "/auth/signin" && pathname !== "/auth/signup" && pathname !== "/auth/error") return null;
    return <>{children}</>;
};

export default AuthGuard;