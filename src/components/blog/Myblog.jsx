import './Blog.css'
import moment from 'moment'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MyBlog = () => {
    const navigator = useNavigate()
    const [MyBloglist, setMyBloglist] = useState([])
    useEffect(()=>{
        document.getElementById('loading').style.display = 'block';
        axios.post('https://blogsoftapi.onrender.com/myblogs', {email: localStorage.getItem('email')})
        .then(response =>{
            if(response.data.message){
                setMyBloglist(response.data.docs.reverse())
                document.getElementById('loading').style.display = 'none';
            }else{
                console.log("error!!")
            }
        })
    },[])

    return(
    <div className = "main-container">{
    MyBloglist.map((blogs) =>(
        <div className = "blog" key = {blogs._id} onClick = {()=>navigator("/view/"+blogs._id)}>
                <div className= "image">
                    <img src={blogs.image} alt=""></img>
                </div>
                <div className='body'>
                    <div className = "header">
                       {blogs.title} 
                    </div>
                    <div className = "footer">
                        <b>{blogs.views} </b><small>views • {moment(blogs.createdAt).fromNow()} </small>
                    </div>
                    <br></br>
                    <div className = "contain">
                        {blogs.desc}
                    </div>
                </div>
            </div>
    ))}
    </div>
    )
}

export default MyBlog;