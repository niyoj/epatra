import React, { useEffect,useState } from 'react'
import Loading from '../../components/Loading';
import { getNews,getNewsDetails,increaseViews,LikePost } from '../../services';
import {BiLike} from 'react-icons/bi'
import {BiShow} from 'react-icons/bi'
// final like icons
import {AiFillLike} from 'react-icons/ai'
import moment from 'moment'
let first;
const NewsDetails = ({news}) => {
  const [isLiked, setIsLiked] = useState(false)
  async function viewedCount(){
      const res=await increaseViews(news.id);
      console.log(res);
      first= false;
  }
  useEffect(() => {
    viewedCount();
    if(news.liked_by===[]){
      setIsLiked(false)
    }else{
      setIsLiked(true)
    }
  }, [])


  const handleLikeBtn = async()=>{
    setIsLiked(!isLiked);
    const res = await LikePost(news.id,isLiked);
    console.log(res);
  }


  if(!news){
    return <Loading/>
  }
  return (
    <div>
      <div className='block'><BiShow size={30}/> {news.view_count}</div>
      <div>{news.title}</div>
      <div>{news.description}</div>
      <div>{news.summary}</div>
      <div>{moment(news.created_on).format('MMM DD, YYYY')}</div>
      <div className='cursor-pointer'> {isLiked?<BiLike size={40} color={"#305da8"} onClick={handleLikeBtn}/>:<AiFillLike size={40} color={"#305da8"} onClick={handleLikeBtn}/>} </div>
    </div>
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