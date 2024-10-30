import React, { useContext, useState } from 'react'
import './NavBar.css'
import { Link, useNavigate } from 'react-router-dom'
import {assets} from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext';

//for search bar

export default function NavBar({setShowLogin}) {
    const [menu,setMenu] = useState("home");
    const {getTotalAmount,token,setToken} = useContext(StoreContext)
    const navigate = useNavigate();
    const logout=()=>{
        localStorage.removeItem("token");
        setToken("");
        navigate('/');
    }
    
  return (
    <div className="navbar">
        <Link to={'/'}>
        <img src={assets.logo} alt="" className='logo'></img></Link> 
        <ul className="navbar-menu">
            <Link to='/' className={menu==='home'?"active":""} 
            onClick={()=>{setMenu("home")}} >Home</Link>

            <a href='#explore-menu' className={menu==='menu'?"active":""}  
            onClick={()=>{setMenu("menu")}}>Menu</a>

            <a href ='#app-download'
            className={menu==='mobile-app'?"active":""}
            onClick={()=>{setMenu("mobile-app")}}>Mobile-App</a>
            
            <a href='#footer' className={menu==='contact-us'?"active":""}
            onClick={()=>{setMenu("contact-us")}}>ContactUs</a>
        </ul>
        <div className="navbar-right">
            <div className="navbar-search-icon">
                <Link to={'/cart'}><img src={assets.basket_icon} alt="" /></Link>
                <div className={getTotalAmount() ===0 ?"":"dot"}></div>
            </div>
            {!token?<button onClick={()=>setShowLogin(true)}>Sign In</button>:
            <div className='navbar-profile'>
                <img src={assets.profile_icon} alt="" />
                <ul className="nav-profile-dropdown">
                    <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" />
                        <p>Orders</p>
                    </li>
                    <hr />
                    <li onClick={logout}><img src={assets.logout_icon} alt="" /> <p>LogOut</p>
                    </li>
                </ul>
            </div>
            }
            
        </div>
    </div>
  )
}
