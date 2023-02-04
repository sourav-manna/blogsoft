import './Sty.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Signin = () =>{
    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [pass, setPass] = useState()
    const [warning, setWarning] = useState("")

    const loginnow = () => {
        if (!email){
            setWarning("Enter Email Id")
        }else if(!pass){
            setWarning("Enter Password")
        }
        else{
        const data = {email: email, pass: pass}
        axios.post('https://blogsoftapi.onrender.com/signin', data)
        .then(response=>{
            if(response.data.status){
                localStorage.setItem('user',response.data.id);
                localStorage.setItem('email',response.data.email);
                localStorage.setItem('name',response.data.name);
                navigate('/')
            }else{
                setWarning("Invalid \n  Email Id or Password")
            }
        })}
    }

    return(
        <div className='log'>
            <table>
                <tr>
                    <h2>Log In</h2>
                    <pre>{warning}</pre>
                </tr>
                <tr>
                    <td><input type = "email" value={email} name = 'email' placeholder='Email id' onChange={(e)=>setEmail(e.target.value)} required></input></td>
                </tr>
                <tr>
                    <td><input type= "password" value={pass} name = 'password' placeholder='Password' onChange={(e)=>setPass(e.target.value)} required></input></td>
                </tr>
                <tr>
                    <td className='btn'><button type='submit' onClick={loginnow}>Submit</button></td>
                </tr>
            </table>
        </div>
    )
}


export default Signin