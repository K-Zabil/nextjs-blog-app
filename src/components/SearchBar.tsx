import { useState } from 'react';

export default function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div className="flex items-center space-x-4 p-4">
            <input
                type="text"
                placeholder="Search blog posts..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="p-2 border rounded-md w-full max-w-md"
            />
            <button
                onClick={handleSearch}
                className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                Search
            </button>
        </div>
    );
};