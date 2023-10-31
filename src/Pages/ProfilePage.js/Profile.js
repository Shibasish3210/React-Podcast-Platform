import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../Components/Navbar';
import Button from '../../Components/Button';
import { EmailAuthProvider, reauthenticateWithCredential, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../../Config/firebase';
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { FiEdit3, FiCheck } from "react-icons/fi";
import Input from '../../Components/Input';
import { doc, updateDoc } from 'firebase/firestore';
import PromptCredentials from './PromptCredentials';
import { handleDeletion, handleEmailUpdation, handleLogOut, handleNameUpdation } from './utils';
// import { useDispatch } from 'react-redux';
// import { setUsers } from '../../ReduxToolkit/Slices/userSlice';

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [displayImage, setDisplayImage] = useState();
    const [isEditingDP, setIsEditingDP] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isDelAcc, setIsDelAcc] = useState(false);
    const [reAuthEmail, setReAuthEmail] = useState('');
    const [reAuthPass, setReAuthPass] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [actionType, setActionType] = useState('');
    const imageRef = useRef(null);
    // const dispatch = useDispatch();

    const user = auth.currentUser;
    useEffect(()=>{
        setName(user?.displayName);
        setEmail(user?.email);
        setPhotoURL(user?.photoURL);
        // dispatch(setUsers({...user}));
    },[user]);

    //uploading actual updated image and perform changes on db of user display image
    useEffect(() => {
        async function uploadImage_setImage(){
            if(displayImage){
                // Create a reference to displayImage
                const displayImageRef = ref(storage, `users-dp/${auth.currentUser.uid}`);
                //uploading the display image
                await uploadBytes(displayImageRef, displayImage);
                
                //getting the display image downloadable link
                const imageUrl = await getDownloadURL(displayImageRef)
                await updateProfile(user, {photoURL: imageUrl }).catch((error) => {
                    toast.error(error.message);
                });
                const docref = doc(db, 'users', user.uid);
                await updateDoc(docref,{
                    dp: imageUrl
                })
                setPhotoURL(imageUrl);
                toast.success('Display image Updated Successfully');
            }
        }
        setDisplayImage();
        setIsEditingDP(false);
        return ()=>{
            return uploadImage_setImage();
        }
    },[displayImage, user])

    //firing up setting the reAuthentication process
    const handleSensitiveData = (type) => {
        if(type === 'email'){
            setActionType('Send Verification Mail');
            setIsEditingEmail(!isEditingEmail);
            if(isEditingEmail){
                setIsModalOpen(true);
            }
        }else if(type === 'delete'){
            setActionType('Delete Account')
            setIsDelAcc(true);
            setIsModalOpen(true);
        }else{
            return;
        }
    }

    // Re Authentication of user if he wants to delete acc or update email
    const handleReAuthentication = async () => {
        setIsModalOpen(false);
        // EmailAuthProvider.credential(reAuthEmail, reAuthPass);
        // const credential = EmailAuthCredential
        const authCredential = EmailAuthProvider.credential(reAuthEmail, reAuthPass);
        try{
            const userCredential = await reauthenticateWithCredential(user, authCredential);
            console.log(userCredential);
            if(isDelAcc){
                await handleDeletion(user);
            }else{
                await handleEmailUpdation(user,email);
                setIsEditingEmail(false);
            }
        }catch(err){
            toast.error(err.message);
        }
        
    }
    
    //firing the image updation process
    const handleImageUpdation = () => {
        setIsEditingDP(true);
        imageRef.current.click();
    }

    
    return (
        <>
        <Navbar/>
        <h1>Profile</h1>

        <div className="wrapper">
         <div className="cont">
            <div className="profilePic">
                <img src={photoURL} alt="profilePicture" />
                <FiEdit3 onClick={handleImageUpdation}/>
                <input disabled={isEditingDP} type="file" onChange={e=>setDisplayImage(e.target.files[0])} ref={imageRef} accept='image/*' />
            </div>
            <div className="info">
            <div>
                <strong>Name : </strong>
                <div>
                    <Input disabled={!isEditingName} setState={setName} state={name} type="text" placeholder='Enter Your Full Name...' /> 
                    {isEditingName ? <FiCheck onClick={()=>handleNameUpdation(setIsEditingName, isEditingName, user, name)}/> : <FiEdit3 onClick={()=>handleNameUpdation(setIsEditingName, isEditingName, user, name)}/>}
                </div>
            </div> 
            <div>
                <strong>Email : </strong>
                <div>
                    <Input disabled={!isEditingEmail} setState={setEmail} state={email} type="text" placeholder='Enter Your Email...' />
                    {isEditingEmail ? <FiCheck onClick={()=>handleSensitiveData('email')}/> : <FiEdit3 onClick={()=>handleSensitiveData('email')}/>}
                </div>
            </div> 
            <div>
                <strong>User ID : </strong>
                <div>
                <Input disabled={true}  state={user.uid} type="text"/>
                </div>
            </div>
            </div>
         </div>
         
         <div className="btn-cont">
            <Button value={'Log Out'} exeFunc={handleLogOut}/>
            <Button value={'Delete Account'} exeFunc={()=>handleSensitiveData('delete')}/>
         </div>
        </div>

        {isModalOpen && 
        <PromptCredentials 
        email={reAuthEmail} 
        password={reAuthPass} 
        setEmail={setReAuthEmail} 
        setPassword={setReAuthPass}
        setIsModalOpen={setIsModalOpen}
        setIsEditingEmail={setIsEditingEmail}
        exeFunc={handleReAuthentication}
        actionType={actionType} 
        />}
    </>
  )
}

export default Profile
