import CategoryList from "@/components/CategoryList";

export default async function Categories() {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-lg">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
                Explore Our Categories
            </h1>
            <CategoryList />
        </div>
    );
};