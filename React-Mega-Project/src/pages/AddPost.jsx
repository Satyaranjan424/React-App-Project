import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className="bg-gray-400 min-h-screen py-10">

      <Container>

        {/* 🔥 Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Create New Post
          </h1>
          <p className="mt-2 text-gray-700">
            Share your ideas, knowledge and creativity with the world
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
          <PostForm />
        </div>

      </Container>

    </div>
  )
}

export default AddPost