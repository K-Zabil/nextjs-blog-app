"use client";

import SearchBar from '@/components/SearchBar';
import { Post } from '@/entities/post';
import { fetchAllPosts } from '@/repositories/postRepository';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

    useEffect(() => {
        const loadPosts = async () => {
            const allPosts = await fetchAllPosts();
            setPosts(allPosts);
            setFilteredPosts(allPosts);
        };
        loadPosts();
    }, []);

    const handleSearch = (query: string) => {
        const filtered = posts.filter((post) =>
            post.title.toLowerCase().includes(query.toLowerCase()));
        setFilteredPosts(filtered);
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-50">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
                Discover Amazing Blog Posts
            </h1>
            <SearchBar onSearch={handleSearch} />
            <ul className="space-y-6 mt-6">
                {filteredPosts.length === 0 ? (
                    <li className="text-center text-lg text-gray-500">No posts found</li>
                ) : (
                    filteredPosts.map((post) => (
                        <Link
                            key={post.id}
                            className="block p-6 bg-white shadow-lg rounded-lg transition transform hover:scale-105 hover:shadow-xl"
                            href={`/categories/${post.category}/${post.id}`}
                        >
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h2>
                            <p className="text-gray-600 text-base">{post.description}</p>
                        </Link>
                    ))
                )}
            </ul>
        </div>
    );
};