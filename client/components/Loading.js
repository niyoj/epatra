import React from 'react'
import { MoonLoader } from 'react-spinners'
const Loading = () => {
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
        <MoonLoader
        color="#305da8"
        loading={true}
        // cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default Loading