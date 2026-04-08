import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            appwriteService.getPost(id).then((post) => {
                if (post) {
                    setPost(post)
                } else {
                    navigate('/')
                }
            })
        } else {
            navigate('/')
        }
    }, [id, navigate])

    // 🔄 Loading State
    if (!post) {
        return (
            <div className="bg-gray-400 min-h-screen flex items-center justify-center">
                <h2 className="text-xl text-gray-700">Loading post...</h2>
            </div>
        )
    }

    return (
        <div className="bg-gray-400 min-h-screen py-10">

            <Container>

                {/* 🔥 Page Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Edit Post
                    </h1>
                    <p className="mt-2 text-gray-700">
                        Update your content and keep it fresh
                    </p>
                </div>

                {/* 🔥 Form Card */}
                <div className="
                    max-w-5xl mx-auto 
                    bg-gray-300 
                    p-6 md:p-8 
                    rounded-xl 
                    shadow-md
                ">
                    <PostForm post={post} />
                </div>

            </Container>

        </div>
    )
}

export default EditPost