'use client';

import { Post } from '@/entities/post';
import { fetchPostById } from '@/repositories/postRepository';
import { useState, useEffect } from 'react';

export default function PostComponent({ params }: { params: { postId: string }; }) {
    const [favorite, setFavorite] = useState(false);
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            const fetchedPost = await fetchPostById(params.postId) as Post;
            setPost(fetchedPost);
        };

        fetchPost();

        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const isFavorite = storedFavorites.includes(params.postId);
        setFavorite(isFavorite);
    }, [params.postId]);

    const toggleFavorite = () => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');

        if (storedFavorites.includes(params.postId)) {
            const updatedFavorites = storedFavorites.filter((id: string) => id !== params.postId);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setFavorite(false);
        } else {
            const updatedFavorites = [...storedFavorites, params.postId];
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setFavorite(true);
        }
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <p className="text-gray-600 mb-4">{post.description}</p>
            <p className="text-gray-800 font-semibold mb-4">Category: {post.category}</p>
            <p className="text-gray-800 font-semibold mb-4">Price: ${post.price}</p>

            <button
                onClick={toggleFavorite}
                className={`px-4 py-2 font-semibold rounded-lg ${favorite
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                    } transition`}
            >
                {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
        </div>
    );
};