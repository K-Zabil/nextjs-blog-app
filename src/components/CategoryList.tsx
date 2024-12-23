import Link from "next/link";

async function fetchCategories() {
    const res = await fetch("http://localhost:5000/categories");
    return res.json();
}

export default async function CategoryList() {
    const categories = await fetchCategories();

    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category: { id: number; name: string }) => (
                <li
                    key={category.id}
                    className="p-6 bg-white shadow-lg rounded-lg transform hover:scale-105 hover:shadow-xl transition duration-300"
                >
                    <Link
                        href={`/categories/${category.name}`}
                        className="text-xl font-semibold text-blue-700 hover:text-blue-900"
                    >
                        {category.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
};