import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet, Navigate } from 'react-router-dom';
import { auth } from '../Config/firebase';
import Navbar from '../Components/Navbar';

const PrivateRoute = () => {
    const [user, loading, error] = useAuthState(auth);
    if(loading){
        return(
            <>
            <Navbar></Navbar>
            <h1 style={{marginTop: '5rem'}}>Loading...</h1>
            </>
            )
    }else if(error || !user) {
        console.log(error)
        return <Navigate to='/' replace/>
    }else{
        return <Outlet/>
    }
  
}

export default PrivateRoute
