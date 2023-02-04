import '../postblog/blogform.css'
import axios from "axios";
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from 'react';



const UpdateB = (props) =>{
    const navigate = useNavigate();
    const [title, setTitle] = useState();
    const [desc, setDesc] = useState();
    const [blog, setBlog] = useState();
    const [image, setImage] = useState();
    const [email, setEmail] = useState();

    useEffect(()=>{
        console.log(props.blog)
        axios.post('https://blogsoftapi.onrender.com/blog', {id: props.blog})
        .then(response =>{
            if(response.data.message){
                let k = response.data.docs;
                if (k.authoremail === localStorage.getItem('email')){
                    setTitle(k.title)
                    setDesc(k.desc)
                    setBlog(k.contain)
                    setImage(k.image)
                    setEmail(k.authoremail)
                }
            }else{
                console.log("Server error!!")
            }
        })
    },[]);

    

    const updatenow = () =>{
        if (localStorage.getItem('user') !== null && localStorage.getItem('email') !== null){
            let mblog = blog
            const user = {_id: localStorage.getItem('user'), email: localStorage.getItem('email')}
            axios.post('https://blogsoftapi.onrender.com/auth', user)
            .then(resp=>{
                if(email === localStorage.getItem('email')){
                if(resp.data.status){
                    console.log('here me')
                    const data = {title: title, desc: desc, contain: mblog, image: image, id: props.blog}
                    axios.post('https://blogsoftapi.onrender.com/blog/dscga75ru/update', data)
                    .then(response=>{
                        if(response.data.status){
                            navigate("/view/"+props.blog)
                        }else{
                            console.log('error!!')
                        }
                    })
                }else alert('Something went wrong')
            }else alert("You don't have permisson to do it")
        })
    
                    
            
        }else{
            alert('please log in')
        }
    }

    return(
        <div className="form-blog">
            <div className="c1">
            <h2>Edit Blog</h2>
            <div className="c2">
            <label>Title</label><br/>
            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/><br/>
            <label>Description</label><br/>
            <input type="text" value={desc} onChange={(e)=>setDesc(e.target.value)}/><br/>
            <label>Blog</label><br/>
            <textarea value={blog} onChange={(e)=>setBlog(e.target.value)}></textarea><br/>
            <label>Image URL</label><br/>
            <input type="text" value={image} onChange={(e)=>setImage(e.target.value)}/><br/>
            <br/><br/>
            </div>
            <button type='submit' onClick={updatenow}>Update</button>
            </div>
        </div>
    )
}

const UpdateBlog = () =>{
    const k = useParams().id
    return (<UpdateB blog = {k} />);
}

export default UpdateBlog;