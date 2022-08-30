import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment'
import './Display.css'


const Blogstuc = (props) =>{
    const data = {id: props.blog}
    const [Blog, setBlog] = useState({})
    const [likes, setLikes] = useState(0)
    useEffect(()=>{
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
            }
        })
    },[]);

    const like = () =>{
        if(localStorage.getItem('user') != null){
        const likedata = {id: localStorage.getItem('user'), blog: props.blog}
        axios.post('https://blogsoftapi.herokuapp.com/likes', likedata)
        .then(res =>{
            console.log(res.data)
            if (res.data == 'add'){
                setLikes(likes + 1)
                document.getElementById('likebtn').style.color = '#DE3163'

            }else{
                setLikes(likes - 1)
                document.getElementById('likebtn').style.color = 'gray'

            }
        })}
        else{
            alert('Please log in')
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
                        {Blog.author}<span class="postTime"><i class="fa-solid fa-calendar-days"></i> {moment(Blog.createdAt).format('MMM DD, YYYY')}</span>
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
            </div>
            </div>
    );
}

const Displayblog = () =>{
    const k = useParams().id
    return (<Blogstuc blog = {k} />);
}


export default Displayblog;