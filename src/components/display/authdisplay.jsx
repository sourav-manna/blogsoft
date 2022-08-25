import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment'
import './Display.css'
import UpdateBlog from '../postblog/update';


const Blogstuc = (props) =>{
    
    const [Blog, setBlog] = useState({})
    useEffect(()=>{
        axios.post('https://blogsoft.herokuapp.com/blog', data)
        .then(response =>{
            if(response.data.message){
                setBlog(response.data.docs)
            }else{
                console.log("Server error!!")
            }
        })
    },[]);

    const navigate = useNavigate();
    const del = () =>{
        console.log('in del')
        if (localStorage.getItem('user') !== null && localStorage.getItem('email') !== null){
            const user = {_id: localStorage.getItem('user'), email: localStorage.getItem('email')}
            console.log("after post")
            axios.post('https://blogsoftapi.herokuapp.com/auth', user)
            .then(resp=>{
                if(resp.data.status){
                    if(Blog.authoremail === localStorage.getItem('email')){
                    axios.delete('https://blogsoftapi.herokuapp.com/delete', {id: props.blog})
                    .then(response=>{
                        if(response.data.status){
                            navigate('/blog')
                        }else{
                            console.log('error!!')
                        }
                    })
                }else alert("You don't have permission")
            }else alert('Something went wrong')})

        }else{
            alert('Please log in')
        }
    }


    const data = {id: props.blog}
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
                        <i class="fa-solid fa-calendar-days"></i> {moment(Blog.createdAt).format('MMM DD, YYYY')}
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
            </div>
    );
}

const Displayblog1 = () =>{
    const k = useParams().id
    return (<Blogstuc blog = {k} />);
}


export default Displayblog1;