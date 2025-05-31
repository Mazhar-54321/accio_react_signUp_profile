import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
    const [userObj, setUserObj] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccessfullySignedUp,setIsSuccessfullySignedUp]=useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const navigate = useNavigate();

    useEffect(()=>{
       if(user?.token){
        
        navigate('/profile');
       }
    },[user])
    useEffect(()=>{
        const userObj =JSON.parse(localStorage.getItem('user'));
        const token = JSON.parse(localStorage.getItem('token'));
        dispatch(setUser({...userObj,token:token}))
    },[])
    const onSubmit = (event) => {
        event.preventDefault();
        const {name,email,password,confirmPassword}=userObj
        if(!name && !email && !password && !confirmPassword){
            setErrorMessage('All fields are mandatory');
            return;
        }
        if(!name || !email || !password || !confirmPassword){
            setErrorMessage('All fields are mandatory');
            return;
        }
        if(password !== confirmPassword){
            setErrorMessage('Passwords do not match');
            return;  
        }
        setIsSuccessfullySignedUp(true);
        setErrorMessage('');
        let randomAccessToken = Date.now();
        localStorage.setItem('user',JSON.stringify(userObj));
        localStorage.setItem('token',randomAccessToken);
        setTimeout(()=>{
            dispatch(setUser({...userObj,token:randomAccessToken}))

        },1000)
    }
    const onChangeHandler = (key, value) => {
        setUserObj((prev) => ({
            ...prev, [key]: value
        }))
    }
    return (
        <div style={{ width: '100%',padding:'100px' }}>
            <header>
                <h1>Signup</h1>
            </header>
            <main className="main-container">
                <form method="post" onSubmit={(event) => { onSubmit(event) }}>
                    <input type="text" onChange={(event) => onChangeHandler('name', event.target.value)} placeholder="Full Name" />
                    <input type="text" onChange={(event) => onChangeHandler('email', event.target.value)} placeholder="Email" />
                    <input type="password" onChange={(event) => onChangeHandler('password', event.target.value)} placeholder="Password" />
                    <input type="password" onChange={(event) => onChangeHandler('confirmPassword', event.target.value)} placeholder="Confirm password" />
                    {Boolean(errorMessage) && <p className='error-message'>{errorMessage}</p>}
                    {isSuccessfullySignedUp && <p style={{color:'green'}}>Successfully signed up</p>}
                    <button type="submit">Signup</button>
                </form>
            </main>
        </div>
    )
}

export default SignUp