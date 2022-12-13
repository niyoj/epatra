import React from 'react'
import { getNews,getNewsDetails } from '../../services';

const NewsDetails = ({news}) => {
  return (
    <div>
      <div>{news.title}</div>
      <div>{news.description}</div>
      <div>{news.summary}</div>
    </div>
  )
}

export default NewsDetails;
export async function getStaticProps({params})
{
  const {data}= await getNewsDetails(params.id);
  return {
    props: {news:data,},
  };
}

export async function getStaticPaths()
{
    const {data} = await getNews()
    return {
        paths :data.map(({id})=>({params:{id}})),
        fallback:true,
    };
}