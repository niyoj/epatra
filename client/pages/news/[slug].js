import React, { useEffect,useState } from 'react'
import Loading from '../../components/Loading';
import { getNews,getNewsDetails,increaseViews,LikePost } from '../../services';
import {BiLike} from 'react-icons/bi'
import {BiShow} from 'react-icons/bi'
import {AiFillLike} from 'react-icons/ai'
import Head from "next/head";
import ReactMarkdown from "react-markdown";

let first;
const NewsDetails = ({news}) => {
  const [isLoggedIn, setIsLoggedIn]  = useState(false);
  const [lastModified, setLastModified] = useState(new Date());
  
  useEffect(() => {
      if (typeof window != undefined) {
      if (localStorage.getItem("accessToken") != undefined) {
        setIsLoggedIn(true);
        }
      }

      if (news != undefined) {
        setLastModified(new Date(news.modified_on));
        viewedCount();
        if(news.liked_by===[]){
          setIsLiked(false)
        }else{
          setIsLiked(true)
        }
      }
  }, []);  

  const [isLiked, setIsLiked] = useState(false)
  async function viewedCount(){
      const res=await increaseViews(news.id);
      console.log(res);
      first= false;
  }


  const handleLikeBtn = async()=>{
    setIsLiked(!isLiked);
    const res = await LikePost(news.id,isLiked);
  }


  if(!news){
    return <Loading/>
  }

  return (
    <main className="inline-flex bg-background flex-col w-[70vw] px-10 py-5 rounded-md m-4">
      <Head>
        <title>{news.title}</title>
        <meta name="description" content={news.summary} />
      </Head>

      <div className='font-bold text-3xl max-w-[60%] text-center text-primary px-4 self-center'>{news.title}</div>
      
      <div className='flex w-[100%] justify-between items-center'>
        <div className='text-tertiary'><span className='font-bold'>Last Modified On:</span> {lastModified.toLocaleDateString("en-us", { month: 'short', day: 'numeric', year: 'numeric',})}</div>
        
        <div className='inline-flex items-center my-4'>
          <div className='inline-flex items-center font-bold text-tertiary mx-4'>{Math.ceil(news.view_count/2)} Views</div>
          <div className='cursor-pointer inline-flex items-center'>{isLiked?<BiLike size={20} color={"#305da8"} onClick={isLoggedIn? handleLikeBtn : null} className="mx-2" />:<AiFillLike size={20} color={"#305da8"} onClick={isLoggedIn? handleLikeBtn : null}  className="mx-2"/>}{(news.liked_by).length}</div>
        </div>
      </div>
      
      <div className='reader my-4 first-letter:text-4xl first-letter:text-primary first-letter:font-bold'>
        <ReactMarkdown>{news.description}</ReactMarkdown>
      </div>
    </main>
  )
}

export default NewsDetails;
export async function getStaticProps({params})
{
  const {data}= await getNewsDetails(params.slug);
  return {
    props: {news:data,},
  };
}

export async function getStaticPaths()
{
    const {data} = await getNews()
    return {
        paths :data.map(({slug})=>({params:{slug}})),
        fallback:true,
    };
}