import { Post } from "@/entities/post";

export async function fetchAllPosts() {
    const res = await fetch('http://localhost:5000/posts');
    const data = await res.json();
    const allPosts = Object.values(data).flat() as Post[];
    return allPosts;
};

export async function fetchPostById(id: string) {
    const res = await fetch('http://localhost:5000/posts');
    const data = await res.json();
    const allPosts = Object.values(data).flat() as Post[];
    return allPosts.find(post => post.id === id);
};