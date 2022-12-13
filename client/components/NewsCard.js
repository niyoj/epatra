import moment from "moment";
import Link from "next/link";
const NewsCard = ({news}) => {
    return (
        <Link href={`/news/${news.slug}`}>
        <div className="bg-background rounded-md w-[300px] m-2 p-3 overflow-hidden">
            <img className="rounded-md h-[200px] w-[300px] mb-4 object-cover" src="https://cdn.runrepeat.com/storage/gallery/buying_guide_primary/46/best-neutral-running-shoes-15275154-main.jpg" alt={news.title} />
            <p className="text-tertiary">{moment(news.created_on).format('MMM DD, YYYY')}</p>
            <h1 className="w-[300px] mb-1 text-primary font-bold text-2xl">{news.title}</h1>
            <p className="">{news.summary}</p>
        </div>
        </Link>
    );
}

export default NewsCard;