import './Blog.css'
import moment from 'moment'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MyBlog = () => {
    const navigator = useNavigate()
    const [MyBloglist, setMyBloglist] = useState([])
    useEffect(()=>{
        axios.post('https://blogsoftapi.herokuapp.com/myblogs', {email: localStorage.getItem('email')})
        .then(response =>{
            if(response.data.message){
                setMyBloglist(response.data.docs.reverse())
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
                        {blogs.author}
                        <span class="postTime"><i class="fa-solid fa-calendar-days"></i> {moment(blogs.createdAt).format('MMM DD, YYYY')}</span>
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