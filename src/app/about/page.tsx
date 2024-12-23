export default function About() {
    return (
        <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 min-h-screen flex items-center justify-center">
            <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
                    About the Blog Application
                </h1>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Welcome to our dynamic blog application built with <strong>Next.js</strong>! This platform demonstrates a modern approach to web development by leveraging the power of server-side rendering and static site generation with Next.js.
                    Our blog allows you to explore different posts categorized into topics, and even mark your favorites for later reference.
                </p>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Technologies Used</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li className="text-gray-700">
                        <strong>Next.js:</strong> The heart of this application! Next.js is a powerful React framework that enables features like server-side rendering, static site generation, and API routes, making the app fast, scalable, and SEO-friendly.
                    </li>
                    <li className="text-gray-700">
                        <strong>TypeScript:</strong> A statically-typed superset of JavaScript that improves code reliability, reduces bugs, and enhances the development experience.
                    </li>
                    <li className="text-gray-700">
                        <strong>Tailwind CSS:</strong> A utility-first CSS framework for building beautiful and responsive user interfaces with minimal effort.
                    </li>
                    <li className="text-gray-700">
                        <strong>json-server:</strong> A simple mock backend for testing and simulating API responses, enabling easy prototyping without the need for a real backend.
                    </li>
                </ul>
                <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Key Features</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li className="text-gray-700">
                        Dynamic and nested routing powered by Next.js to provide seamless navigation between categories and posts.
                    </li>
                    <li className="text-gray-700">
                        Favorites functionality to store and view marked posts locally in your browser.
                    </li>
                    <li className="text-gray-700">
                        Responsive design using Tailwind CSS to ensure a great experience on all devices.
                    </li>
                    <li className="text-gray-700">
                        Server-side data fetching and static rendering with Next.js for optimal performance and SEO.
                    </li>
                </ul>
                <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Why Next.js?</h2>
                <p className="text-lg text-gray-700 leading-relaxed mt-6">
                    <strong>Next.js</strong> brings many powerful features to the table:
                    <ul className="list-inside list-disc pl-6 text-gray-700">
                        <li>Automatic Static Optimization for fast loading speeds.</li>
                        <li>Server-side rendering (SSR) for improved SEO and performance.</li>
                        <li>File-based routing, making it simple to create new pages and routes.</li>
                        <li>API routes, enabling backend logic without needing a separate server.</li>
                    </ul>
                    All of these features combined make Next.js an ideal choice for building fast, scalable, and SEO-friendly web applications like this blog.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mt-6">
                    This blog is not only a demonstration of modern web development but also an excellent starting point for anyone looking to learn about Next.js, React, and other modern JavaScript technologies.
                </p>
            </div>
        </div>
    );
};