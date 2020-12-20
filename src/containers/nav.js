import React from 'react'
import Checklist from '../images/checklist.png'

const Nav = () =>{
    return(
      <div className="nav">
        <div className="logo">
        <h2 className='title'>Tasks To Do</h2>
        <img src={Checklist} height={50}  width={50}/>
        </div>
      </div>
    )
}

export default Nav;