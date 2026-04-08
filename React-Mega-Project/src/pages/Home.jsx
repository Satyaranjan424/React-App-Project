import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    // 🔴 EMPTY STATE (Improved)
    if (posts.length === 0) {
        return (
            <div className="w-full py-16 text-center bg-gray-400 min-h-[70vh] flex items-center">
                <Container>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Welcome to <span className="text-black">SRD Blog</span>
                    </h1>

                    <p className="mt-4 text-gray-700">
                        Discover amazing posts or login to start sharing your thoughts.
                    </p>

                    <div className="mt-6">
                        <button className="px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition">
                            Login to Continue
                        </button>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className="w-full bg-gray-400 min-h-screen py-10">

            {/* 🔥 HERO SECTION */}
            <Container>
                <div className="mb-10 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Explore Latest Posts
                    </h1>
                    <p className="mt-2 text-gray-700">
                        Read, learn and share your knowledge with the world
                    </p>
                </div>
            </Container>

            {/* 🔥 POSTS GRID */}
            <Container>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {posts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
            </Container>

        </div>
    )
}

export default Home