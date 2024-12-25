"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthError() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/auth/signin"); 
    }, 5000); 
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
        <h1 className="text-3xl font-semibold text-red-600">Authentication Error</h1>
        <p className="mt-4 text-lg text-gray-700">
          Unfortunately, an error occurred during the authentication process.
          Please try again later or contact support if the issue persists.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          You will be redirected to the sign-in page shortly...
        </p>
        <div className="mt-6 flex justify-center">
          <div className="animate-pulse">
            <span className="text-xl font-medium text-gray-600">Redirecting...</span>
          </div>
        </div>
      </div>
    </div>
  );
};