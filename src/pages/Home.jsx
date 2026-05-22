
import React from 'react'
import { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const[roomId, setRoomId] = useState("");
  const[userName, setUserName] = useState("");

  const createNewRoom = (e)=>{
    e.preventDefault();
    const id = uuidv4();
    setRoomId(id);
    toast.success('New Room Created');
  }
  
  const joinRoom = () =>{
    if(!roomId || !userName){
      toast.error('ROOM ID & Username are required');
      return;
    }
    navigate(`editor/${roomId}`, {
      state : {
        userName,
      }
    })
  }

  const handleInputEnter = (e) => {
    if(e.code === 'Enter'){
      joinRoom();
    }
  }

  return (
    <div className='homePageWrapper'>
      <div className='formWrapper'>
        <img className='homePageLogo' src="code-sync.png" alt="code-sync-logo" />
        <h4 className='mainLabel'>Paste invitatin ROOM ID</h4>
        <div className='inputGroup'>
          <input onKeyUp={handleInputEnter} onChange={(e) => setRoomId(e.target.value)} value={roomId} type="text" className='inputBox' placeholder='ROOM ID' />
          <input onKeyUp={handleInputEnter}  onChange={(e)=> setUserName(e.target.value)} value = {userName} type="text" className='inputBox' placeholder='USERNAME' />
        <button className='btn joinBtn' onClick={joinRoom}>Join</button>
        <span className='createInfo'>
          if you don't have an invite then create &nbsp;
          <a onClick={createNewRoom} href="" className='createNewBtn'>new room</a>
        </span>
        </div>
      </div>
    </div>
  )
}

export default Home
