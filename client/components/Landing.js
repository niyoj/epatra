import NewsCard from "./NewsCard";

const Landing = ({data}) => {
  return (
    <div className="flex flex-wrap">
    {
      data.map((news)=>
        <NewsCard key={news.slug} news={news}/>
      )
    }
    </div>
  );
};

export default Landing;
