const NewsCard = (props) => {
    return (
        <div className="bg-background rounded-md w-[300px] m-2 p-3 overflow-hidden">
            <img className="rounded-md h-[200px] w-[300px] mb-4 object-cover" src="https://cdn.runrepeat.com/storage/gallery/buying_guide_primary/46/best-neutral-running-shoes-15275154-main.jpg" alt={props.title} />
            <h1 className="w-[300px] mb-1 text-primary font-bold text-2xl">{props.title}</h1>
            <p className="">{props.summary}</p>
        </div>
    );
}

export default NewsCard;