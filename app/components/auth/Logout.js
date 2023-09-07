"use client";

import Context from "./Context";
import { useContext } from "react";
import { logOut } from "@/app/actions/serverActions";
import { useRouter } from "next/navigation";

export default function Logout({navActive}) {
    const { isLoggedIn, reset } = useContext(Context);
    const router = useRouter();

    const handleLogout = async () => {
        let token = localStorage.getItem('jwt');
        const logout = await logOut(token);
        if(logout.success == true) {
            navActive();
            reset();
            router.push('/login')
        }
    }

    return(
        isLoggedIn ? (<div onClick={handleLogout} className="logout">Logout</div>) : (<></>)
    )
}