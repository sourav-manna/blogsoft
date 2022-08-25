import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () =>{
    const navigator = useNavigate();
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [pass, setPass] = useState(null);
    const [warning, setWarning] = useState(null);

    const signupnow = () =>{
        if(name !== null && email !== null && pass !== null){
            axios.get('https://blogsoftapi.herokuapp.com/usercheck', {email: email})
            .then(res =>{
                if(res.data.status){
                    setWarning('Email id already register')
                }else{
                    const data = {name: name, email: email, pass: pass};
                    axios.post('https://blogsoftapi.herokuapp.com/signup', data)
                    .then(response =>{
                        if(response.data.status){
                            console.log('user data store')
                            navigator('/signin')
                        }else{
                            console.log(response.data.message)
                        }
                    })
                }
            })
        }else{
            setWarning('Fill all details')
        }
    }


    return(
        <div className='log'>
        <table>
            <h2>Sign up</h2>
            <p>{warning}</p>
            <tr>
            <td><input type="email" name="email" id="useremail" value={email} placeholder='Email Id' onChange={(e) => setEmail(e.target.value)}/></td>
            </tr>
            <tr>
            <td><input type="text" name="name" id="username" value={name} placeholder='Name' onChange={(e) => setName(e.target.value)}/></td>
            </tr>
            <tr>
            <td><input type="password" name="pass" id="userpass" value={pass} placeholder='Password' onChange={(e) => setPass(e.target.value)}/></td>
            </tr>
            <tr>
            <td><button type="submit" onClick={signupnow}>Submit</button></td>
            </tr>
            <tr>
            <td><button type="submit" onClick={()=>navigator('/signin')}>Sign in Instead</button></td>
            </tr>
        </table>
        </div>
    )
}

export default Signup;