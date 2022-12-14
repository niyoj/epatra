import React,{useState,useEffect} from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import FormData from "form-data";
import { useRouter } from 'next/router';
import axios from 'axios';
import { getTags } from '../services';
import { Tags } from './Tags';

const EditorMd = () => {
  const router = useRouter();
  const [markdown, setMarkdown] = useState("")
  const [title, setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [isArticle, setIsArticle] = useState(false)
  const [tags, setTags] = useState([])
  const [tagCol, setTagCol] = useState("");
  const [isChecked, setIsChecked] = useState(false)

  const fetchTags = async()=>{
    const res = await getTags();
    const data = res.data;
    setTags(data);
    console.log(tags);
  }
  useEffect(() => {
    (typeof window !== "undefined") ? localStorage.getItem("isLoggedIn") : false;
    if(typeof window !== "undefined"){
      const state = localStorage.getItem("isLoggedIn")
      if(state == "false"){
        router.push("/login");
      }
      fetchTags(); 
    }
  }, [])
  
  // const handleTags = (id)=>{
  //   setTagCol(id);
  // }


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
      if(tagCol !== "") bodyFormData.append("tags", tagCol);
      bodyFormData.append("is_article", isChecked);
 
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
            setIsChecked(false);
          }
    } catch (error) {
      console.error("Error making post")
    }
  }
  const handleTypeChange = ()=>{
    setIsChecked(!isChecked)
  }
  return (
    <>
    <div className=' flex flex-row justify-center items-center'>

      <div className='flex flex-col'>
      <label className={`block font-extrabold mb-2 text-onbackground`}>Title of the News/Article</label>
        <input className={`block bg-background w-80 border-0 border-b-2 focus:outline-0 border-primary text-onbackground`} type='Text' name='Text' placeholder='Title of news' value={title} onChange={(e)=> setTitle(e.target.value)}/>
        {
        tags.map((tag)=>{
          return <Tags tag = {tag} key ={tag.id} setTagCol={setTagCol}/>
        })
      }
      <div>Article&nbsp;<input type="checkbox" value="Article" onClick={handleTypeChange} checked={ isChecked} /></div>
        <h1 className='font-bold text-2xl text-center text-primary'>Markdown format!</h1>
        <textarea className='md:h-96 md:w-96 appearance-none block bg-onsurface-variant text-secondary-variant border  rounded-lg py-4 px-3 focus:outline-none' value={markdown} onChange={(e)=>{
          setMarkdown(e.target.value)
        }} placeholder="Your Description Here"></textarea>
        <h1 className='font-bold text-3xl text-primary'>Summary</h1>
        <textarea className='md:h-80 md:w-80 appearance-none block bg-onsurface-variant text-secondary-variant border  rounded-lg py-4 px-3 focus:outline-none' value={summary} onChange={(e)=>setSummary(e.target.value)} placeholder="Your Summary Here"></textarea>
      </div>

      <div className='pl-9'>
          <h1 className='font-bold text-3xl text-center text-primary'>Demo</h1>
            <div className='md:h-96 md:w-96 border  rounded-lg py-4 px-3 overflow-y-auto'><ReactMarkdown>{markdown}</ReactMarkdown></div>
        </div>
        <div className="pl-5 flex flex-col items-center justify-center">
          <button className="my-4 bg-primary text-onprimary px-6 py-2 rounded-md capitalize font-bold w-32 hov:-translate-x-1 disabled:cursor-not-allowed disabled:bg-tertiary" disabled={markdown==="" || title==="" || summary===""} onClick={handleCreateNewsArticle}>Submit</button>
          <button className="my-4 bg-primary text-onprimary px-6 py-2 rounded-md capitalize font-bold w-32 hov:-translate-x-1 disabled:cursor-not-allowed disabled:bg-tertiary" disabled={markdown==="" || title==="" || summary===""} onClick={()=>{setTitle("");setSummary(""); setMarkdown("")}}>Clear</button>
        </div>
    </div>
    </>
  )
}

export default EditorMd