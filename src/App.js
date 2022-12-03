import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import Blog from './components/blog/Blog';
import HomePage from './components/HomePage/HomePage';
import Displayblog from './components/display/Display';
import Signin from './components/login/Signin';
import Signup from './components/Signup/Signup';
import CreateBlog from './components/postblog/create';
import Displayblog1 from './components/display/authdisplay';
import { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateBlog from './components/postblog/update';
import MyBlog from './components/blog/Myblog';
import Deshboard from './components/dashboard/dashboard';



function App() {
  const [Bloglist, setBloglist] = useState([])
    useEffect(()=>{
        axios.get('https://blog-backend-production-032d.up.railway.app/bloglist')
        .then(response =>{
            if(response.data.message){
                setBloglist(response.data.docs.reverse())
                document.getElementById('loading').style.display = 'none';
            }else{
                console.log("error!!")
            }
        })
    },[])
  
  return (
    <div className="App">
    <div className='body-main'>
    <div className='container-image' id='loading'>
          <img src="https://i.pinimg.com/originals/43/3b/6c/433b6c5336c72a21bcfd9db8d831562a.gif"alt=""/>
    </div>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route exact path="/" element={<HomePage blog={Bloglist}/>}/>
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<Displayblog/>}/>
        <Route path="/signin" element={<Signin />} />
        <Route path="/join" element={<Signup/>} />
        <Route path='/create' element={<CreateBlog/>}/>
        <Route path='/update/:id' element={<UpdateBlog/>}/>
        <Route path='/view/:id' element={<Displayblog1 />} />
        <Route path='/myblogs' element={<MyBlog/>} />
        <Route path='/dashboard' element={<Deshboard/>} />
      </Routes>
    </BrowserRouter>
    </div>
    </div>
  );
}

export default App;
