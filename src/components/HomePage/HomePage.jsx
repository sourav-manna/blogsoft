import './HomePage.css';
import moment from 'moment'
import {useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Page = (props) =>{
    let blog = props.blog;
    const navigator = useNavigate()
    const [index, setIndex] = useState(0)

    let Bloglist_length = blog.length

    let div1 = blog[index%Bloglist_length]
    let div2 = blog[(index+1)%Bloglist_length]
    let div3 = blog[(index+2)%Bloglist_length]


    return(
        <div className='container'>
        <button className='b2' id='btu2' onClick={()=>{setIndex((index+1))}}><i class="fa-solid fa-circle-chevron-right fa-2xl"></i></button>
            <div className = "blog2" onClick = {()=>navigator("/blog/"+div1._id)}>
                <div className= "image">
                    <img src={div1.image} alt=""></img>
                </div>
                <div className='body'>
                <div className = "header">
                       {div1.title}
                    </div>
                    <div className = "footer">
                        <b>{div1.author}</b><br></br>
                        <small>{div1.views} views • {moment(div1.createdAt).fromNow()}</small>
                    </div>
                    <br></br>
                    <div className = "contain">
                        {div1.desc}
                    </div>
                </div>
            </div>
            <div className = "blog" onClick = {()=>navigator("/blog/"+div2._id)}>
                <div className= "image">
                    <img src={div2.image} alt=""></img>
                </div>
                <div className='body'>
                <div className = "header">
                       {div2.title}
                    </div>
                    <div className = "footer">
                        <b>{div2.author}</b><br></br>
                        <small>{div2.views} views • {moment(div2.createdAt).fromNow()}</small>
                    </div>
                    <br></br>
                    <div className = "contain">
                        {div2.desc}
                    </div>
                </div>
            </div>
            <div className = "blog2" onClick = {()=>navigator("/blog/"+div3._id)}>
                <div className= "image">
                    <img src={div3.image} alt=""></img>
                </div>
                <div className='body'>
                <div className = "header">
                       {div3.title}
                    </div>
                    <div className = "footer">
                        <b>{div3.author}</b><br></br>
                        <small>{div3.views} views • {moment(div3.createdAt).fromNow()}</small>
                    </div>
                    <br></br>
                    <div className = "contain">
                        {div3.desc}
                    </div>
                </div>
            </div>
            <button className='b1' id='btu1' onClick={()=>{if(index === 0){setIndex(Bloglist_length-1);} else{setIndex(index-1)}}}><i class="fa-solid fa-circle-chevron-left fa-2xl"></i></button>
        </div>
    )

}

const HomePage = (blogdata) =>{
    if(blogdata.blog.length > 0){
        return(
            <Page blog = {blogdata.blog}/>)
    }
    
}

export default HomePage;