import React from 'react'

export const Tags = ({tag , setTagCol}) => {
    const handleTagClick =   ()=>{
        setTagCol(tag.id);
    }
  return (
    <div><li onClick={handleTagClick} className="cursor-pointer">{tag.name}</li></div>
  )
}
