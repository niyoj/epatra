import React from 'react'

export const Tags = ({tag , setTagCol ,setActiveTag}) => {
    const handleTagClick =   ()=>{
        setTagCol(tag.id);
        setActiveTag(tag.name)
    }
  return (
    <div><li onClick={handleTagClick} className="cursor-pointer">{tag.name}</li></div>
  )
}
