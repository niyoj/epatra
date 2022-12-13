// import React from "react";
// import Head from "next/head";
// import { useRouter } from "next/router";
// import NewsCards from "./NewsCards";

// const Landing = ({data}) => {
//   console.log(data);
//   const router = useRouter();
//   return (
//     <>
//     <div className="bg-surface-variant">
//       <div className="py-5 flex flex-row-reverse">
//       <div className="pr-5">
//       <button className="my-4 bg-primary text-onprimary px-6 py-2 rounded-md capitalize font-bold w-auto hov:-translate-x-1 disabled:cursor-not-allowed disabled:bg-tertiary"
//         onClick={() => {
//           router.push("/login");
//         }}
//       >
//         <a className="">Sign In</a>
//       </button>  
//       </div>
//       <div className="pr-10">

//         <button className="my-4 bg-primary text-onprimary px-6 py-2 rounded-md capitalize font-bold w-auto hov:-translate-x-1 disabled:cursor-not-allowed disabled:bg-tertiary"
//           onClick={() => {
//             router.push("/register");
//           }}
//         >
//           <a className="">Register</a>
//         </button>
//       </div>
//       </div>
//     </div>



//     <div className="flex flex-wrap">
//       <Head>
//         <title>ePatra | The Ultimate News Portal</title>
//       </Head>
      
//           {
//             data.map((news)=>
//               <NewsCards key={news.slug} news={news}/>
//             )
//           }

          

//     </div>
//     </>
//   )
// }
import NewsCard from "./NewsCard";

const Landing = ({data}) => {
  return (
    <div className="flex flex-wrap">
    {
      data.map((news)=>
        <div className="p-6"><NewsCard key={news.slug} news={news}/></div>
      )
    }
    </div>
  );
};

export default Landing;
