import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment'
import './Display.css'


const Blogstuc = (props) =>{
    
    const [Blog, setBlog] = useState({})
    const [likes, setLikes] = useState(0)
    const [commt, setCommt] = useState()
    const [Commentt, setComment] = useState([])
    const [activel, setActivel] = useState(false)

    useEffect(()=>{
        document.getElementById('loading').style.display = 'none';
        const data = {id: props.blog}
        axios.post('https://blogsoftapi.herokuapp.com/blog', data)
        .then(response =>{
            if(response.data.message){
                setBlog(response.data.docs)
            }else{
                console.log("Server error!!")
            }
        })
        axios.post('https://blogsoftapi.herokuapp.com/getlikes', {id: localStorage.getItem('user'), blog: props.blog})
        .then(res=>{
            setLikes(res.data.count)
            if(res.data.status){
                document.getElementById('likebtn').style.color = '#DE3163'
                setActivel(true)
            }
        })
        axios.post('https://blogsoftapi.herokuapp.com/getcomments', data)
        .then(ress=>{
            console.log(data)
            console.log(ress.data.docs)
            setComment(ress.data.docs)
        })
    },[]);

    const like = () =>{
        if(localStorage.getItem('user') != null){
        const likedata = {id: localStorage.getItem('user'), blog: props.blog}
        axios.post('https://blogsoftapi.herokuapp.com/likes', likedata)
        .then(res =>{
            if(res.data){
            if (!activel){
                document.getElementById('likebtn').style.color = '#DE3163'
                setLikes(likes+1)
                setActivel(true)

            }else{
                document.getElementById('likebtn').style.color = 'gray'
                setLikes(likes-1)
                setActivel(false)
            }}
        })}
        else{
            alert('Please log In')
        }
    }

    const refetchcomm = () =>{
        axios.post('https://blogsoftapi.herokuapp.com/getcomments', {id: props.blog})
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
                 axios.post('https://blogsoftapi.herokuapp.com/comment', commdata)
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
                        <b>{Blog.author}</b> • {Blog.views} views <span class="postTime"><i class="fa-solid fa-calendar-days"></i> {moment(Blog.createdAt).fromNow()}</span>
                        <p id='likebtn' onClick={()=>like()}><i class="fa-solid fa-heart fa-lg"></i> {likes}</p>
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

                <div>
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
            </div>
            
    );
}

const Displayblog = () =>{
    const k = useParams().id
    return (<Blogstuc blog = {k} />);
}


export default Displayblog;