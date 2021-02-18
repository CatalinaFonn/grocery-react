import React, { useEffect } from 'react'

const Alert = ({type, msg, list, showAlert}) => {
  useEffect(()=>{
    
    const timer = setTimeout(()=>{
      showAlert()
    
    },1700)
    return () => clearTimeout(timer) ;
 

  },[list])

  return (
    <p className={`alert alert-${type}`}>
    {msg}
    </p>
  )
}

export default Alert
