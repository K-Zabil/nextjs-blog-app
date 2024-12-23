import { notFound } from 'next/navigation';
import Link from 'next/link';

async function fetchCategoryPosts(category: string) {
    const res = await fetch(`http://localhost:5000/posts`);
    const posts = await res.json();
    return posts[category] || null;
}

export default async function CategoryPage({ params: paramsPromise }: { params: Promise<{ category: string }> }) {
    const params = await paramsPromise;
    const posts = await fetchCategoryPosts(params.category);

    if (!posts || posts.length === 0) notFound();

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center capitalize">
                {params.category} Posts
            </h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post: { id: number; title: string }) => (
                    <li
                        key={post.id}
                        className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-transform transform hover:scale-105"
                    >
                        <Link
                            href={`/categories/${params.category}/${post.id}`}
                            className="text-xl font-semibold text-blue-700 hover:text-blue-900 block"
                        >
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};