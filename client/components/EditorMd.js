import React,{useState,useEffect} from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import FormData from "form-data";
import { useRouter } from 'next/router';
import axios from 'axios';

const EditorMd = () => {
  const router = useRouter();
  const [markdown, setMarkdown] = useState("")
  const [title, setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [isArticle, setIsArticle] = useState(false)
  useEffect(() => {
    const isLoggedIn = (typeof window !== "undefined") ? localStorage.getItem("isLoggedIn") : false;
    if(!isLoggedIn){
      router.push("/login")
    }
  }, [])
  


  const handleCreateNewsArticle = async()=>{
    console.log(title);
    console.log(markdown);
    console.log(summary);

    try {
      const accessToken =localStorage.getItem("accessToken");
      console.log(accessToken);
      let bodyFormData = new FormData();
      bodyFormData.append("title", title);
      bodyFormData.append("description", markdown);
      bodyFormData.append("summary", summary);
      bodyFormData.append("is_article", isArticle);

      const res = await axios.post(
        "http://localhost:8000/api/v1/news/n/",
        bodyFormData,
          {
            headers: {
              "Content-type": "multipart/form-data",
              "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
          );
          console.log(res);
          if(res.status==200){
            setMarkdown("")
            setTitle("")
            setSummary("")
          }
    } catch (error) {
      console.error("Error making post")
    }
  }
  return (
    <div className='flex flex-col items-center py-8'>

      <div className='flex flex-col mb-[100px]'>
        <label className={`block font-extrabold mb-2 text-primary`}>Title of the News/Article</label>
        <input className={`block font-primary text-3xl font-bold bg-primary-variant w-[50vw] border-0 border-b-2 focus:outline-0 border-primary text-onbackground`} type='Text' name='Text' placeholder='Title of news' value={title} onChange={(e)=> setTitle(e.target.value)}/>
        
        <p className='font-bold text-primary mb-2 mt-6'>Markdown format!</p>
        <textarea className='bg-background h-[200px] text-onbackground rounded-md py-4 px-3 focus:outline-none' value={markdown} onChange={(e)=>{
          setMarkdown(e.target.value)
        }} placeholder="Your Description Here"></textarea>
        

        <p className='font-bold text-primary mb-2 mt-6'>Summary</p>
        <textarea className='bg-background text-onbackground rounded-md py-4 px-3 focus:outline-none h-[200px]' value={summary} onChange={(e)=>setSummary(e.target.value)} placeholder="Your Summary Here"></textarea>
      </div>

        <div className="flex flex-col items-center justify-center">
          <button className="bg-primary text-onprimary px-6 py-2 rounded-md capitalize font-bold w-32 hov:-translate-x-1 disabled:cursor-not-allowed disabled:bg-tertiary" disabled={markdown==="" || title==="" || summary===""} onClick={handleCreateNewsArticle}>Submit</button>
        </div>
    </div>
  )
}

export default EditorMd