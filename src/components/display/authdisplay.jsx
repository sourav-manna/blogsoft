import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment'
import './Display.css'


const Blogstuc = (props) =>{
    const uniquedata = {id: props.blog}
    const [Blog, setBlog] = useState({})
    const [likess, setLikess] = useState(0)
    useEffect(()=>{
        axios.post('https://blogsoftapi.herokuapp.com/blog', uniquedata)
        .then(response =>{
            if(response.data.message){
                setBlog(response.data.docs)
            }else{
                console.log("Server error!!")
            }
        })
        axios.post('https://blogsoftapi.herokuapp.com/getlikes', uniquedata)
        .then(ress=>{
            setLikess(ress.data.count)
        })
    },[]);
    
    const navigate = useNavigate();
    const del = () =>{
        let text = "\n   Delete this blog ?";
        if (localStorage.getItem('user') !== null && localStorage.getItem('email') !== null){
            const user = {_id: localStorage.getItem('user'), email: localStorage.getItem('email')}
            axios.post('https://blogsoftapi.herokuapp.com/auth', user)
            .then(resp=>{
                if(resp.data.status){
                    if(Blog.authoremail === localStorage.getItem('email')){
                    if(window.confirm(text) === true){
                    axios.post('https://blogsoftapi.herokuapp.com/dscga75ru/delete', uniquedata)
                    .then(response=>{
                        if(response.data.status){
                            navigate('/myblogs')
                        }else{
                            console.log('error!!')
                        }
                    })
                }}else alert("You don't have permission")
            }else alert('Something went wrong')})

        }else{
            alert('Please log in')
        }
    }
    
    const linknetwork = '/update/'+props.blog 
    

    return(
        <div className='disp'>
            <div className = "blog-body">
                <div>
                    <img src={Blog.image} alt=""></img>
                </div>
                <div className='body'>
                    <div className = "header">
                       {Blog.title}
                    </div>
                    <div className = "footer">
                        <i class="fa-solid fa-calendar-days"></i> {moment(Blog.createdAt).fromNow()}
                        <span class="postTime"><div className='action-bar'> <Link to={linknetwork} className='linking' ><div className='edit'><i class="fas fa-edit fa-xl"></i>
                        </div></Link> &nbsp;|&nbsp; <div className='del' onClick={() =>{del()}}><i class="fa-solid fa-trash-can fa-xl"></i></div></div></span>
                    </div>
                    <br></br>
                    <div className = "blog_contain">
                        {Blog.desc}
                    </div>
                    <div>
                        <textarea className='view_me' readOnly value={Blog.contain}>
                        </textarea>
                    </div>
                </div>
            </div>
            <div className='sideminitab'>
                <h1>{likess}</h1>
                Likes
                <h1>{Blog.views}</h1>
                Views
                <br></br>
                <br></br>
                <div className='sidiv'>
                <div className='action-bar'> <Link to={linknetwork} className='linking' ><div className='edit'><i class="fas fa-edit fa-xl"></i>
                        </div></Link> &nbsp;|&nbsp; <div className='del' onClick={() =>{del()}}><i class="fa-solid fa-trash-can fa-xl"></i></div></div>
                </div>
                </div>
        </div>
    );
}

const Displayblog1 = () =>{
    const k = useParams().id
    return (<Blogstuc blog = {k} />);
}


export default Displayblog1;