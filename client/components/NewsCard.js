import moment from "moment";
import Link from "next/link";
import banner from "../public/backdrop.png";

const NewsCard = ({news}) => {
    return (
        <Link href={`/news/${news.slug}`}>
        <div className="bg-background rounded-md w-[300px] m-2 p-3 transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
            <img className="rounded-md h-[200px] w-[300px] mb-4 object-cover" src={banner.src} alt={news.title} />
            <p className="text-tertiary">{moment(news.created_on).format('MMM DD, YYYY')}</p>
            <h1 className="w-[300px] mb-1 text-primary font-bold text-2xl">{(news.title).substr(0, 30)}{((news.title).length > 30) && "..."}</h1>
            <p className="">{(news.summary).substr(0, 193)}{((news.title).length > 193) && "..."}</p>
        </div>
        </Link>
    );
}

export default NewsCard;