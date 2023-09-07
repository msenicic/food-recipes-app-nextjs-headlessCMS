"use client";

import { createContext, useState, useEffect } from "react";

export const Context = createContext(null);

export const ContextProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [serverMessage, setServerMessage] = useState(false)
    const [loginDetails, setLoginDetails] = useState(()=>JSON.parse(localStorage.getItem('loginDetails')) || {
        username: 'trial',
        password: 'trial',
    })
    const [signUpDetails, setSignUpDetails] = useState({
        email: '',
        user_login: '',
        password: '',
    })
    const [postDetails, setPostDetails] = useState({
        title: '',
        meal_category: '',
        meal_area: '',
        meal_image: null,
        ingredients: [{ingredient:'',ingredient_value:''}],
        instructions: '',
    })
    const [token, setToken] = useState(()=>localStorage.getItem('jwt') || '');
    const [vh, setVh] = useState(()=>window.innerHeight * 0.01);

    useEffect(() => {
        const setActualVh = () => {
            setVh(window.innerHeight * 0.01);
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        setActualVh();
        window.addEventListener('resize', setActualVh);

        return () => {
            window.removeEventListener('resize', setActualVh);
        };
    }, [vh]);

    const reset = () => {
        setLoginDetails({
            username: 'trial',
            password: 'trial',
        })
        localStorage.removeItem('jwt');
        localStorage.removeItem('loginDetails');
        setServerMessage(false)
        setIsLoggedIn(false);
        setToken('');
    }

    const value = {
        isLoggedIn,
        setIsLoggedIn,
        serverMessage,
        setServerMessage,
        loginDetails,
        setLoginDetails,
        signUpDetails,
        setSignUpDetails,
        token,
        setToken,
        postDetails, 
        setPostDetails,
        reset
    }

    return(
        <Context.Provider value={value}>{children}</Context.Provider>
    )
}

export default Context;