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
    if(!user){
        return (
        <>
        <Navbar/>
        <h1 style={{marginTop: '5rem'}}>Loading...</h1>
        </>
        );
    } 

    // console.log(user);
    return (
    <>
        <Navbar/>
        <h1>Profile</h1>

        <div className="wrapper">
         <div className="cont">
            <div className="profilePic">
                <img src={user.dp} alt="profilePicture" />
            </div>
            <div className="info">
            <p><strong>Name : </strong> <span>{user.name}</span></p>
            <p><strong>Email : </strong> <span>{user.email}</span></p>
            <p><strong>User ID : </strong> <span>{user.id}</span></p>
            </div>
         </div>
         
         <Button value={'Log Out'} exeFunc={handleLogOut}/>
        </div>
    </>
  )
}

export default Profile
