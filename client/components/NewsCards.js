import React from 'react'
import Link from 'next/link'
import moment from 'moment'
const NewsCards = ({news}) => {
  return (
    <div className="bg-surface-variant flex flex-row justify-center items-center p-10">
      {/* <h1 className="transition duration-700 text-center mb-8 mt-8 cursor-pointer hover:text-pink-600 text-3xl font-semibold">
                <Link href={`/news/${news.slug}`}>
                {news.title}
                </Link>
      </h1>
      <div>
        {news.summary}
      </div>
      <div>{moment(news.created_on).format('MMM DD, YYYY')}</div> */}
      <div className='w-96 h-96 p-4 bg-surface rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl'> 
        {/* Image */}
        <img src="https://images.pexels.com/photos/13716813/pexels-photo-13716813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className='h-40 w-full object-cover rounded-xl'></img>
        <div className='p-2'>
        <h2 className='font-bold text-2xl'>{(news.title).substr(0, 46)}...</h2>
        <p className='text-sm'>{(news.summary).substr(0, 80)}...</p>
        <p className='text sm text-error'>{moment(news.created_on).format('MMM DD, YYYY')}</p>
        </div>
        {/* CTA */}
        <div className='m-2'>
        <button className=''><Link className="text-surface bg-tertiary px-3 py-1 rounded-md hover:bg-secondary" href={`/news/${news.slug}`}>Continue Reading!</Link></button>  
        </div>
      </div>
    </div>
  )
}

export default NewsCards