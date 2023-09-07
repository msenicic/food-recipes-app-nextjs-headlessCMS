"use client";

import Context from "../components/auth/Context";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "../actions/serverActions";

export default function SingUp() {
    const {serverMessage, setServerMessage, signUpDetails, setSignUpDetails, setLoginDetails} = useContext(Context)
    const router = useRouter()
    const authKey = process.env.NEXT_PUBLIC_AUTH_KEY

    useEffect(()=>{
        setServerMessage(false);
        setSignUpDetails({
            email: '',
            user_login: '',
            password: '',
        });
    },[]) 

    function handleChange(e) {
        const { name, value } = e.target
        setSignUpDetails(prev => {
            return (
                { ...prev, [name]: value }
            )
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await signUp(signUpDetails, authKey);

        if (data.success == true) {
            setServerMessage(data.message)
            setLoginDetails({
                username: signUpDetails.user_login,
                password: signUpDetails.password
            })
            router.push('/login');
        }
        else {
            setServerMessage(data.data.message)
        }
    }

    return (
        <section className='auth'>
            <div className="container">
                <div className="form">
                    <div className='title'>
                        <h1>Sign Up</h1>
                    </div>
                    {serverMessage && <p>{serverMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="User Name" name="user_login" value={signUpDetails.user_login} onChange={handleChange} />
                        <input type="email" placeholder="Email Adress" name="email" value={signUpDetails.email} onChange={handleChange} />
                        <input type="password" placeholder="Password" name="password" value={signUpDetails.password} onChange={handleChange} />
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </section>
    )
}