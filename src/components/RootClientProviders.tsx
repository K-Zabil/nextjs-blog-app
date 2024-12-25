"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import AuthGuard from "@/components/AuthGuard";
import { FilterProvider } from "@/context/FilterContext";

export default function RootClientProviders({
    children,
    session,
}: {
    children: ReactNode;
    session: any;
}) {
    return (
        <SessionProvider session={session}>
            <AuthGuard>
                <FilterProvider>{children}</FilterProvider>
            </AuthGuard>
        </SessionProvider>
    );
};