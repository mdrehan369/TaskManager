import React, { useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext.js';
import "../../public/css/header.css"
import axios from 'axios';

function Header() {

    const { user, setUser } = useUserContext();

    const fetchData = async () => {
        const token = localStorage.getItem("token");
        if(token === '') return;
        try{
            let res = await axios.get("/api/getUser", {
                headers: {'authorization': `Bearer ${token}`}
            });
            setUser(res.data.data);
        } catch(e) {
            console.log("Error while fetching user" + e);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleActive = ({isActive}) => isActive?"active":"";
    const handleLogout = () => {
        localStorage.setItem("token", "");
        setUser({});
    }

  return (
    <header>
        <div className="logo">Task Sphere</div>
        <nav>
            <ul>
                {
                    Object.keys(user).length !== 0 && <>
                        <li onClick={handleLogout} id='logout'>Logout</li>
                    </>
                }

                {
                    Object.keys(user).length === 0 && <>
                        <li><NavLink to={'/login'} className={handleActive} id='login'>Log In</NavLink></li>
                        <li><NavLink to={'/signup'} className={handleActive} id='signup'>Sign Up</NavLink></li>
                    </>
                }
                
            </ul>
        </nav>
    </header>
  )
}

export default Header
