import React from 'react'
import Link from 'next/link'
const NewsCards = ({news}) => {
  return (
    <div className="bg-tertiary">
      <h1 className="transition duration-700 text-center mb-8 mt-8 cursor-pointer hover:text-pink-600 text-3xl font-semibold">
                <Link href={`/news/${news.id}`}>
                {news.title}
                </Link>
      </h1>
      <div>
        {news.summary}
      </div>
    </div>
  )
}

export default NewsCards