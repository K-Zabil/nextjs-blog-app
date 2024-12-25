import Link from "next/link";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]";
import RootClientProviders from "@/components/RootClientProviders";

export const metadata = {
  title: "Blog App",
  description: "A simple blog with categories and posts",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-800">
        <header className="bg-white shadow-md">
          <nav className="max-w-7xl mx-auto p-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">
              <Link href="/">BlogApp</Link>
            </div>
            <div className="space-x-6 text-lg">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">
                About
              </Link>
              <Link href="/categories" className="text-gray-700 hover:text-blue-600 transition">
                Categories
              </Link>
            </div>
          </nav>
        </header>
        <main className="max-w-7xl mx-auto p-6 mt-6 bg-white shadow-lg rounded-lg">
          <RootClientProviders session={session}>{children}</RootClientProviders>
        </main>
        <footer className="bg-gray-800 text-white py-4 mt-10">
          <div className="max-w-7xl mx-auto text-center">
            © 2024 BlogApp. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
};