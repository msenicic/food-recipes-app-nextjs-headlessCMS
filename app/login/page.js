"use client";

import { useContext } from 'react';
import Context from '../components/auth/Context';
import { auth, logIn } from '../actions/serverActions';
import { useRouter } from "next/navigation";

export default function Login() {
    const {loginDetails, setLoginDetails, serverMessage, setServerMessage, setToken} = useContext(Context)
    const router = useRouter();
    
    function handleChange(e) {
        const { name, value } = e.target
        setLoginDetails(prev => {
            return (
                { ...prev, [name]: value }
            )
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await auth(loginDetails)

        if (data.success == true) {
            const login = await logIn(data.data.jwt)
            if(login.success == true) {
                localStorage.setItem('jwt', data.data.jwt)
                localStorage.setItem('loginDetails', JSON.stringify(loginDetails))
                setToken(data.data.jwt)
                setServerMessage('')
                router.push('/')
            } else {
                setServerMessage(login.data.message)
            }
        } else {
            setServerMessage(data.data.message)
        }
    }
    
    return (
        <section className='auth'>
            <div className='container'>
                <div className="form">
                    <div className='title'>
                        <h1>Login</h1>
                        <p>If you don&apos;t want to create a new profile you can use a trial one</p>
                    </div>
                    <p>{serverMessage}</p>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="User Name" name="username" value={loginDetails.username} onChange={handleChange} />
                        <input type="password" placeholder="Password" name="password" value={loginDetails.password} onChange={handleChange} />
                        <button type="submit">Log In</button>
                    </form>
                </div>
            </div>
        </section>
    )
}