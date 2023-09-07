"use client";

import { useContext, useEffect, useState } from "react";
import Context from "./Context";
import { useRouter, usePathname } from "next/navigation";
import Loader from "../Loader";
import { validate } from "@/app/actions/serverActions";

export default function Auth({children}) {
    const { isLoggedIn, token, reset, setIsLoggedIn } = useContext(Context)
    const [isLoading, setIsLoading] = useState(true)
    const [firstTime, setFirstTime] = useState(true)
    const router = useRouter();
    const pathname = usePathname();

    useEffect(()=>{
        const timerId = setTimeout(() => {
            setFirstTime(true);
        }, 3600000);

        return () => {
            clearTimeout(timerId);
        }
    },[firstTime])
    
    useEffect(()=>{
        setIsLoading(true);
        let userJWT = localStorage.getItem('jwt') || token;
        const load = async () => {
            const auth = await validate(userJWT);
            if (auth.success==true) {
                if(pathname == '/login' || pathname == '/signup') {
                    router.push('/') 
                    setIsLoggedIn(true)
                    return
                }
                setIsLoggedIn(true)
                setIsLoading(false);
            } else {
                if(pathname == '/login' || pathname == '/signup') {
                    setIsLoading(false);
                    return
                }
                reset();
                router.push('/login');
            }
        }

        if(!firstTime && isLoggedIn && (pathname != "/login" && pathname != '/signup')){
            setIsLoading(false);
            return;
        } else if(!firstTime && !isLoggedIn && (pathname == "/login" || pathname == '/signup')){
            setIsLoading(false);
            return;
        }
        load();
        setFirstTime(false) 
    },[pathname])

    return (
        isLoading ? (<Loader />) : (children)
    )
}