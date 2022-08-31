import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import './Navbar.css';
 
function Navbar() {
    const navigate = useNavigate()
    const chagedisp = () =>{
        if (window.innerWidth <=  600){
            document.getElementById('sidenav').style.display = "none";
            document.getElementById('menubar').style.display= "inline";
        }
    }
    if (localStorage.getItem('user') !== null && localStorage.getItem('email') !== null && localStorage.getItem('name') !== null){
        return (
        <nav>
        <nav className = "navbar">
            <div className='first'>
                <i id='menubar' onClick={()=>{document.getElementById('menuclose').style.display = "inline"; document.getElementById('menubar').style.display = "none"; document.getElementById('sidenav').style.display = "block"}} class="fa-solid fa-bars fa-xl"></i>
            </div>
            <div className='middle'>
                <img src={`${process.env.PUBLIC_URL}/asset/image/weblogo.png`} alt=''></img><h3><b>Soft</b></h3>
            </div>
            <div className='last'>
                <div className='user'>
                <div className='logo' onClick={()=>{ navigate('/dashboard')}}>{localStorage.getItem('name')[0]}</div>
                <div className='onlypc' onClick={() =>{localStorage.clear(); navigate('/')}}><i class="fas fa-sign-out-alt fa-xl"></i></div>
                </div>
            </div>
        </nav>
        <nav className='side-nav' id='sidenav'>
            <i id='menuclose' onClick={()=>{document.getElementById('menuclose').style.display= "none"; document.getElementById('menubar').style.display= "inline"; document.getElementById('sidenav').style.display = "none"}} class="fa-solid fa-xmark fa-xl"></i>
            <div>
                <li onClick={()=>{navigate("/dashboard");chagedisp()}}>{localStorage.getItem('name')}</li>
                <li onClick={()=>{navigate("/");chagedisp()}}>Home</li>
                <li onClick={()=>{navigate("/blog");chagedisp()}}>Blogs</li>
                <hr className='main-h'/>
                <li onClick={()=>{navigate("/create");chagedisp()}}>Create Blog</li>
                <li onClick={()=>{navigate("/dashboard");chagedisp()}}>My Blogs</li>
                <hr className='main-h'/>
                <li onClick={()=>{navigate("/Signin");chagedisp(); localStorage.clear()}}>Sign out</li>
            </div>
        </nav>     
        </nav>);
    }else{
    return (
        <nav>
        <nav className = "navbar">
            <div className='first'>
                <i id='menubar' onClick={()=>{document.getElementById('menuclose').style.display = "inline"; document.getElementById('menubar').style.display = "none"; document.getElementById('sidenav').style.display = "block"}} class="fa-solid fa-bars fa-xl"></i>
            </div>
            <div className='middle'>
                <img src={`${process.env.PUBLIC_URL}/asset/image/weblogo.png`} alt=''></img><h3><b>Soft</b></h3>
            </div>
            <div className='last'>
                <Link to='/join'><button id='sbtu'>Join <span className='hide'><i class="fa-solid fa-arrow-right-long"></i></span></button></Link>
            </div>
        </nav>
        <nav className='side-nav' id='sidenav'>
            <i id='menuclose' onClick={()=>{document.getElementById('menuclose').style.display= "none"; document.getElementById('menubar').style.display= "inline"; document.getElementById('sidenav').style.display = "none"}} class="fa-solid fa-xmark fa-xl"></i>
            <div>
                <li onClick={()=>{navigate("/");chagedisp()}}>Home</li>
                <li onClick={()=>{navigate("/blog");chagedisp()}}>Blogs</li>
                <li onClick={()=>{navigate("/Signin");chagedisp()}}>Sign In</li>
            </div>
        </nav>     
        </nav>
    );}
}

export default Navbar;