'use client';

import { useState, useEffect } from 'react';

export default function PostComponent({ params }: { params: { category: string; postId: string }; }) {
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const isFavorite = storedFavorites.some(
            (item: { category: string; postId: string }) =>
                item.category === params.category && item.postId === params.postId
        );
        setFavorite(isFavorite);
    }, [params.category, params.postId]);

    const toggleFavorite = () => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');

        if (
            storedFavorites.some(
                (item: { category: string; postId: string }) =>
                    item.category === params.category && item.postId === params.postId
            )
        ) {
            const updatedFavorites = storedFavorites.filter(
                (item: { category: string; postId: string }) =>
                    item.category !== params.category || item.postId !== params.postId
            );
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setFavorite(false);
        } else {
            const updatedFavorites = [
                ...storedFavorites,
                { category: params.category, postId: params.postId },
            ];
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setFavorite(true);
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Post {params.postId} in {params.category}
            </h1>
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