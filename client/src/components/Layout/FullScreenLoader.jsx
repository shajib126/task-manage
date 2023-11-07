import React from 'react'
import {useSelector} from 'react-redux'
import './FullScreenLoader.css'

const FullScreenLoader = () => {
    const loader = useSelector((state)=>state.settings.loader)
  return (
    <>
    {loader === "" && 
    <div className={"LaodingOverlay"}>
        <img src="https://www.davidkingsbury.co.uk/wp-content/uploads/2021/08/lg.ring-loading-gif.gif" alt="" />
    </div>
}
    </>
  )
}

export default FullScreenLoader