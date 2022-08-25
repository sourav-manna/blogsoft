import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment'
import './Display.css'


const Blogstuc = (props) =>{
    const data = {id: props.blog}
    const [Blog, setBlog] = useState({})
    useEffect(()=>{
        axios.post('https://blogsoftapi.herokuapp.com/blog', data)
        .then(response =>{
            if(response.data.message){
                console.log(response.data.docs)
                setBlog(response.data.docs)
            }else{
                console.log("Server error!!")
            }
        })
    },[]);


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
                        {Blog.author}
                        <span class="postTime"><i class="fa-solid fa-calendar-days"></i> {moment(Blog.createdAt).format('MMM DD, YYYY')}</span>
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
            </div>
    );
}

const Displayblog = () =>{
    const k = useParams().id
    return (<Blogstuc blog = {k} />);
}


export default Displayblog;