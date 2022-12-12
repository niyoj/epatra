// import dynamic from 'next/dynamic';
import React,{useState} from 'react'
import { Editor } from "react-draft-wysiwyg"
import { EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import EasyMDE from 'easymde';
// Import the Slate editor factory.
// import { createEditor } from 'slate'

// // Import the Slate components and React plugin.
// import { Slate, Editable, withReact } from 'slate-react'


// const initialValue = [
//   {
//     type: 'paragraph',
//     children: [{ text: 'A line of text in a paragraph.' }],
//   },
// ]
// const EasyMDE = dynamic(()=> import('easymde'),{ssr:false})
// console.log(EasyMDE.render)
// console.log(EasyMDE.render.prototype())
const EditorMd = () => {
  const [change, setChange] = useState("")
  
  // const [editor] = useState(() => withReact(createEditor()))
  // console.log(editor);
  // const Reveal = await (await import("reveal.js")).default
  
  // console.log(easymde)
  return (
    <div>
        <Editor
        wrapperClassName="demo-wrapper"g
        editorClassName="demo-editor"
        onEditorStateChange={setChange(value)}
      />
    </div>
  )
}

export default EditorMd;