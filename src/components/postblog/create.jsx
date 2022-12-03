import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const CreateBlog = () =>{
    const navigate = useNavigate();
    const [title, setTitle] = useState();
    const [desc, setDesc] = useState();
    const [blog, setBlog] = useState();
    const [image, setImage] = useState();

    const createnow = () =>{
        if (localStorage.getItem('user') !== null && localStorage.getItem('email') !== null){
        let mblog = blog
        const user = {_id: localStorage.getItem('user'), email: localStorage.getItem('email')}
        axios.post('https://blog-backend-production-032d.up.railway.app/auth', user)
        .then(resp=>{
            if(resp.data.status){
                const data = {title: title, desc: desc, contain: mblog, image: image, author: resp.data.name , authoremail: localStorage.getItem('email')}
                axios.post('https://blog-backend-production-032d.up.railway.app/create', data)
                .then(response=>{
                    if(response.data.message){
                        navigate('/dashboard')
                    }else{
                        console.log('error!!')
                    }
                })
            }else alert('Something went wrong')
        })

                
        
    }else{
        alert('please log in')
    }
}


    return(
        <div className="form-blog">
        <div className="c1">
            <h2>Blog Post</h2>
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
            <button type='submit' onClick={createnow}>Publish</button>
        </div>
        </div>
    )
}

export default CreateBlog;