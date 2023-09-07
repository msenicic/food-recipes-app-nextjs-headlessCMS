"use client"

import { useContext } from 'react'
import Context from './auth/Context';

export default function Footer() {
    const { isLoggedIn, loginDetails } = useContext(Context);
    return (
        <footer>
            <p>{isLoggedIn ? loginDetails.username : 'mSenicic'}</p>
        </footer>
    )
}