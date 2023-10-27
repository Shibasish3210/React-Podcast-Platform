import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet, Navigate } from 'react-router-dom';
import { auth } from '../Config/firebase';
import Navbar from '../Components/Navbar';
import Loader from '../Components/Loader';

const PrivateRoute = () => {
    const [user, loading, error] = useAuthState(auth);
    if(loading){
        return(
            <>
            <Navbar></Navbar>
            <div style={{display: 'flex', width: '100%', height: '90vh', alignItems: 'center', justifyContent: 'center'}} className="loader">
            <Loader width={200} height={200}></Loader>
            </div>
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
