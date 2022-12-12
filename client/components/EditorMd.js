import React,{useState} from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

const EditorMd = () => {
  const [markdown, setMarkdown] = useState("Welcome to Markdown editor")
  return (
    <>
    
    <div className='h-screen flex flex-col'>
      <div className='h-screen flex flex-row justify-center items-center'>
        <div>
        <h1 className='font-bold text-3xl text-center text-primary'>Markdown format!</h1>
        <textarea className='md:h-[700px] md:w-[700px] appearance-none block bg-onsurface-variant text-secondary-variant border  rounded-lg py-4 px-3 focus:outline-none' value={markdown} onChange={(e)=>{
          setMarkdown(e.target.value)
        }}></textarea>
        </div>
        <div>
          <h1 className='font-bold text-3xl text-center text-primary'>Demo</h1>
            <div className='md:h-[700px] md:w-[700px] border  rounded-lg py-4 px-3 overflow-y-auto'><ReactMarkdown>{markdown}</ReactMarkdown></div>
        </div>
        <div className="pl-5 flex flex-col items-center justify-center">
          <button className="my-4 bg-primary text-onprimary px-6 py-2 rounded-md capitalize font-bold w-32 hov:-translate-x-1 disabled:cursor-not-allowed disabled:bg-tertiary" disabled={markdown===""}>Submit</button>
          <button className="my-4 bg-primary text-onprimary px-6 py-2 rounded-md capitalize font-bold w-32 hov:-translate-x-1 disabled:cursor-not-allowed disabled:bg-tertiary" disabled={markdown===""} onClick={()=>setMarkdown("")}>Clear</button>
          
        </div>
        </div>
    </div>
    </>
  )
}

export default EditorMd