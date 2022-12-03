import './Blog.css'
import moment from 'moment'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Blog = () => {
    const navigator = useNavigate()
    const [Bloglist, setBloglist] = useState([])
    useEffect(()=>{
        document.getElementById('loading').style.display = 'block';
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
    return(
    <div className = "main-container">{
    Bloglist.map((blogs) =>(
        <div className = "blog" key = {blogs._id} onClick = {()=>navigator("/blog/"+blogs._id)}>
                <div className= "image">
                    <img src={blogs.image} alt=""></img>
                </div>
                <div className='body'>
                    <div className = "header">
                       {blogs.title}
                    </div>
                    <div className = "footer">
                        <b>{blogs.author}</b><br></br>
                        <small>{blogs.views} views • {moment(blogs.createdAt).fromNow()}</small>
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

export default Blog;