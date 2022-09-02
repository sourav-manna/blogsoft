import axios from "axios";
import { useEffect, useState } from "react"
import MyBlog from "../blog/Myblog";


const Deshboard = () =>{
    const [likes, setLikes] = useState(0);
    const [view, setView] = useState(0);
    const [totalblog, setTotalblog] =  useState(0);
    const [status, setStatus] = useState(true);
    const data = {user: localStorage.getItem('email')}

    const refer = () =>{
    axios.post('https://blogsoftapi.herokuapp.com/myblogs', {email: localStorage.getItem('email')})
    .then(res=>{
        let cc1 = 0 ;
        let cc2 = 0 ;
        let cc3 = 0 ;
        res.data.docs.map((blogs) => (
            axios.post('https://blogsoftapi.herokuapp.com/getlikes', {blog : blogs._id})
            .then(ress=>{
                cc1 += ress.data.count
                setLikes(cc1)
                cc2 += blogs.views
                setView(cc2)
                cc3 += 1
                setTotalblog(cc3)
            })
        ))
    })
    }
    if(status){
        refer()
        setStatus(false)
    }
    

    return(
        <>
        <br></br>
        <h2>Hi, {localStorage.getItem('name')}</h2>
        <h3>Your Blog details</h3>
        <div className = "main-container">
            <br></br>
            <div className = "blog">
                <h1>{likes}</h1>
                <p>Total Likes</p>
                <br></br>
                <br></br>
            </div>
            <div className = "blog">
                <h1>{view}</h1>
                <p>Total Views</p>
                <br></br>
            </div>
            <div className = "blog">
                <h1>{totalblog}</h1>
                <p>Total Blogs</p>
                <br></br>
            </div>
        </div>
        <br></br>
        <br></br>
        <h3>Your Blogs</h3>
        <MyBlog/>
        </>
    )
}

export default Deshboard;