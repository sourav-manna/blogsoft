import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () =>{
    const navigator = useNavigate();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const [warning, setWarning] = useState();

    const signupnow = () =>{
        if(name != undefined && email != undefined && pass != undefined){
            axios.get('https://blogsoftapi.herokuapp.com/usercheck', {email: email})
            .then(res =>{
                if(res.data.status){
                    setWarning('Email Id \n Already register')
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
            if(!email){
                setWarning('Enter your Email')
            }else if(!name){
                setWarning('Enter your Name')
            }else if(!pass){
                setWarning('Enter Password')
            }
        }
    }


    return(
        <div className='log'>
        <table>
            <h2>Sign Up</h2>
            <pre>{warning}</pre>
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