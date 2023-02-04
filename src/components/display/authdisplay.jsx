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
    const [commt, setCommt] = useState()
    const [Commentt, setComment] = useState([])

    useEffect(()=>{
        document.getElementById('loading').style.display = 'none';
        axios.post('https://blogsoftapi.onrender.com/ownblog', uniquedata)
        .then(response =>{
            if(response.data.message){
                setBlog(response.data.docs)
            }else{
                console.log("Server error!!")
            }
        })
        axios.post('https://blogsoftapi.onrender.com/getlikes', {blog: props.blog})
        .then(ress=>{
            setLikess(ress.data.count)
        })
        axios.post('https://blogsoftapi.onrender.com/getcomments', {id: props.blog})
        .then(ress=>{
            console.log(ress.data.docs)
            setComment(ress.data.docs)
        })
    },[]);
    
    const navigate = useNavigate();
    const del = () =>{
        let text = "\n   Delete this blog ?";
        if (localStorage.getItem('user') !== null && localStorage.getItem('email') !== null){
            const user = {_id: localStorage.getItem('user'), email: localStorage.getItem('email')}
            axios.post('https://blogsoftapi.onrender.com/auth', user)
            .then(resp=>{
                if(resp.data.status){
                    if(Blog.authoremail === localStorage.getItem('email')){
                    if(window.confirm(text) === true){
                    axios.post('https://blogsoftapi.onrender.com/dscga75ru/delete', uniquedata)
                    .then(response=>{
                        if(response.data.status){
                            navigate('/dashboard')
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

    const refetchcomm = () =>{
        axios.post('https://blogsoftapi.onrender.com/getcomments', {id: props.blog})
        .then(ress=>{
            setComment(ress.data.docs)
        })
    }

    const commfunc = () =>{
        if(localStorage.getItem('user') != null && localStorage.getItem('name') != null){
            if(commt === undefined || commt == null || commt === ""){
                alert('Please enter your comment')
            }else{
                 const commdata = {blog: props.blog, user: localStorage.getItem('user'), name: localStorage.getItem('name'), comment: commt}
                 axios.post('https://blogsoftapi.onrender.com/comment', commdata)
                 .then(resss=>{
                    if(resss.data.status){
                        refetchcomm()
                    }
                 })
                 setCommt("")
            }

        }else{
            alert('Please log In')
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
                    <div className='comment-box'>
                        <h1>Comments</h1>
                        <hr/>
                        {Commentt.map((comm)=>(
                            <div>
                            <b>{comm.name}</b><small> • {moment(comm.createdAt).fromNow()}</small>
                            <br></br>
                            <span>{comm.comment}</span>
                            <br></br>
                            <br></br>
                            </div>
                        ))} 
                        <br></br>
                     <br></br>
                    </div>
                    <div className='commentsend'>
                        <input type="text" name="name" value={commt} placeholder='Type here ...' onChange={(e) => setCommt(e.target.value)}></input> 
                        <button onClick={()=>commfunc()}>Comment</button>
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