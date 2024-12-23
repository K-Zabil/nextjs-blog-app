'use client';

import PostComponent from '@/components/PostComponent';
import { useParams } from 'next/navigation';

export default function PostPage() {
    const params = useParams() as { category: string; postId: string };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <PostComponent params={params} />
        </div>
    );
};