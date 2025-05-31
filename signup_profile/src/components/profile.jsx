import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser, clearUser } from '../redux/slices/userSlice';

const Profile = () => {
  const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const navigate = useNavigate();
    useEffect(()=>{
      if(!user?.token){
        navigate("/")
      }
    },[user])
    const clickHandler = ()=>{
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      dispatch(clearUser())

    }
  return (
    <div style={{ width: '100%',padding:'100px' }}>
      <h1>Profile</h1>
      <h2>Full Name:{user?.name}</h2>
      <h2>Email:{user?.email}</h2>
      <h2>Password:{user?.password}</h2>
      <button onClick={clickHandler} style={{padding:'5px 10px'}}>Logout</button>
    </div>
  )
}

export default Profile