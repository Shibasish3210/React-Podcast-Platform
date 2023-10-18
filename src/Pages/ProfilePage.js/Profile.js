import React from 'react'
import Navbar from '../../Components/Navbar'
import { useSelector } from 'react-redux';
import Button from '../../Components/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../../Config/firebase';
import { toast } from 'react-toastify';

const Profile = () => {
    const user = useSelector(state=>state.users.users)

    const handleLogOut = () => {
        signOut(auth)
            .then(() => {
                toast.success('Successfully logged out');
            })
            .catch((error) => {
                console.log(error);
            });
        }

    console.log(user);
    // if(!user){
    //     return (
    //     <>
    //     <Navbar/>
    //     <h1 style={{marginTop: '5rem'}}>Loading...</h1>
    //     </>
    //     );
    // } 
    return (
    <>
        <Navbar/>
        <h1>Profile</h1>

        <div className="wrapper">
         <div className="cont">
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.id}</p>
         </div>
         
         <Button value={'Log Out'} exeFunc={handleLogOut}/>
        </div>
    </>
  )
}

export default Profile
