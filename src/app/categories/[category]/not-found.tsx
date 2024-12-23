import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-red-600 mb-4">
                Category not found
            </h1>
            <p className="text-lg text-gray-700 mb-6">
                The category you are looking for does not exist or has been removed.
            </p>
            <Link
                href="/categories"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
            >
                Back to Categories
            </Link>
        </div>
    );
};