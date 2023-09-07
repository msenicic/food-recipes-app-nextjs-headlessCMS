'use client';

import Link from 'next/link'
import { useState, useContext } from 'react'
import Context from './auth/Context';
import Logout from './auth/Logout';

export default function Header({ menu }) {
    const { isLoggedIn } = useContext(Context);
    const [active, setActive] = useState(false);

    const navActive = () =>{
        setActive(prev=>!prev);
    }

    return (
        <header>
            <div className="container">
                <div className="logo">
                    {active ? (<Link onClick={navActive} href="/">Recipes</Link>) : (<Link href="/">Recipes</Link>)}
                </div>
                <div className="button" onClick={navActive}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <nav className={active ? "active" : null}>
                    <div className="xbutton" onClick={navActive}>
                        <span></span>
                        <span></span>
                    </div>
                    <ul>
                        {isLoggedIn ? 
                            menu.map((item)=>(
                                <li key={item.ID}><Link onClick={navActive} href={item.url}>{item.title}</Link></li>
                            )) : (<> 
                                <li><Link onClick={navActive} href='/signup'>SignUp</Link></li>
                                <li><Link onClick={navActive} href='/login'>LogIn</Link></li>
                            </>)
                        }
                        <Logout navActive={navActive}/>
                    </ul>
                </nav>
            </div>
        </header>
    )
}