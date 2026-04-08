import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    return (
        <div className="w-full bg-gray-400 min-h-screen py-10">

            {/* 🔥 Page Heading */}
            <Container>
                <div className="mb-10 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                        All Posts
                    </h1>
                    <p className="mt-2 text-gray-700">
                        Browse all available posts shared by the community
                    </p>
                </div>
            </Container>

            {/* 🔴 Empty State */}
            {posts.length === 0 ? (
                <Container>
                    <div className="text-center py-16">
                        <h2 className="text-2xl font-semibold text-gray-700">
                            No posts available
                        </h2>
                        <p className="mt-2 text-gray-600">
                            Be the first one to create a post 🚀
                        </p>
                    </div>
                </Container>
            ) : (
                /* 🔥 Posts Grid */
                <Container>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {posts.map((post) => (
                            <PostCard key={post.$id} {...post} />
                        ))}
                    </div>
                </Container>
            )}

        </div>
    )
}

export default AllPosts