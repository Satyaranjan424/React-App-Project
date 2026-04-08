import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, Title, FeaturedImage }) {

  return (
    <Link to={`/post/${$id}`}>
      <div className="
        w-full 
        bg-gray-300 
        rounded-xl p-4
        overflow-hidden 
        shadow-sm 
        hover:shadow-lg 
        transition duration-300 
        cursor-pointer
      ">

        {/* 🔥 Image */}
        <div className="w-full h-48 overflow-hidden rounded-xl">
          <img
            src={appwriteService.getFilePreview(FeaturedImage)}
            alt={Title}
            className="
              w-full h-full object-cover 
              transform hover:scale-105 
              transition duration-300
            "
          />
        </div>

        {/* 🔥 Content */}
        <div className="p-4">
          <h2 className="
            text-lg font-semibold text-gray-800 
            line-clamp-2
          ">
            {Title}
          </h2>

          {/* Optional subtle hint */}
          <p className="text-sm text-gray-600 mt-2">
            Read more →
          </p>
        </div>

      </div>
    </Link>
  )
}

export default PostCard