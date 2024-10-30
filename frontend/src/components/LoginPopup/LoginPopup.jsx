import React, {  useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
const LoginPopup = ({setShowLogin}) => {
    const [currentState,setCurrentState]=useState("SignUp");
    const {url,token,setToken} = useContext(StoreContext)
    const [data,setData] = useState({
      name:"",
      email:"",
      password:""
    })
    const onChangeHandler = (event)=>{
      setData(data=>({...data,[event.target.name]:event.target.value}));
    }
    const onLogin=async (event)=>{
      event.preventDefault();
      let newUrl = url;
      if(currentState ==='Login'){
        newUrl+='/api/user/login'
      }else{
        newUrl+='/api/user/register'
      }

      const response = await axios.post(newUrl,data);
      if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        setShowLogin(false);
      }else{
        alert(response.data.message);
      }

    }


  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className="login-popup-title">
            <h2>{currentState}</h2>
            <img src={assets.cross_icon} alt=""  onClick={()=>setShowLogin(false)} />
        </div>
        <div className="login-popup-inputs">
            {currentState === 'Login' ? <></>:
            <input type="text" placeholder='Your Name' name='name' onChange={onChangeHandler} value={data.name} required/>
            }
            <input type="email" placeholder='Your email'
            name='email' onChange={onChangeHandler} value={data.email}
            required />
            <input type="password"  placeholder='Password' 
            name='password' onChange={onChangeHandler} value={data.password}required/>
        </div>
        <button type='submit'>{currentState === 'SignUp' ? "Create Account":"Login"}</button>

        <div className="login-popup-condition">
            <input type="checkbox" name="" id="" required />
            <p>By continuing, I agree to the terms of use and privacy policy</p>
        </div>
        { currentState === 'Login' ? 
        <p>Create a new account ?<span onClick={()=>setCurrentState('SignUp')}> Click here</span></p>
        : <p>Already have an account ? <span onClick={()=>setCurrentState("Login")}> Login here</span></p>
        }
        
      </form>
    </div>
  )
}

export default LoginPopup
