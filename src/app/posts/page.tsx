"use client";

import SearchBar from '@/components/SearchBar';
import { Post } from '@/entities/post';
import { fetchAllPosts } from '@/repositories/postRepository';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useFilters } from '@/context/FilterContext';
import { Category } from '@/entities/post';

export default function HomePage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const { category, minPrice, maxPrice, sortByDate, setCategory, setMinPrice, setMaxPrice, toggleSortByDate } = useFilters();

    useEffect(() => {
        const loadPosts = async () => {
            const allPosts = await fetchAllPosts();
            setPosts(allPosts);
            setFilteredPosts(allPosts);
        };
        loadPosts();
    }, []);

    useEffect(() => {
        let updatedPosts = posts;
        if (category && category !== "") updatedPosts = updatedPosts.filter(post => post.category === category);
        updatedPosts = updatedPosts.filter(post => post.price >= minPrice && post.price <= maxPrice);
        if (sortByDate) updatedPosts = updatedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setFilteredPosts(updatedPosts);
    }, [category, minPrice, maxPrice, sortByDate, posts]);

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

            <div className="flex space-x-4 mt-6">
                <select
                    value={category || ""}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="">All Categories</option>
                    {Object.keys(Category).map((key) => {
                        if (isNaN(Number(key))) {
                            return (
                                <option key={key} value={key}>
                                    {key}
                                </option>
                            );
                        }
                        return null;
                    })}
                </select>
                <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    placeholder="Min Price"
                    className="p-2 border rounded"
                />
                <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    placeholder="Max Price"
                    className="p-2 border rounded"
                />
                <button onClick={toggleSortByDate} className="p-2 bg-blue-500 text-white rounded">
                    {sortByDate ? 'Sort by Date (Descending)' : 'Sort by Date (Ascending)'}
                </button>
            </div>

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