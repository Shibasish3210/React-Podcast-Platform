import { deleteUser, signOut, updateProfile, verifyBeforeUpdateEmail } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../../Config/firebase";

//handling Deletion of Account
export const handleDeletion = async (user) => {
    try{
        await deleteUser(user)
        toast.success('Account Deleted Successfully');
    }catch(error){
        toast.error(error.message);
    };
}

//handle email updation of account
export const handleEmailUpdation = async (user, email) => {
    if(email.trim() === user.email || email === ''){
        return;
    }
    try {
        await verifyBeforeUpdateEmail(user, email);
        const docref = doc(db, 'users', user.uid);
        await updateDoc(docref,{
            email : email.trim()
        })
        toast.success('Email Verification Mail Has Been Sent');
        toast.success('You Will Be Logged Out Once You Verify');
    } catch (error) {
        toast.error(error.message);
    }
}

export //handling logging out of the account
const handleLogOut = () => {
    signOut(auth)
        .then(() => {
            toast.success('Successfully logged out');
        })
        .catch((error) => {
            toast.error(error.message);
        });
}

//handle changing username of profile
export const handleNameUpdation = async (setIsEditingName, isEditingName, user, name) => {
    setIsEditingName(!isEditingName);
    if(isEditingName && (name === '' || name === user.displayName) ){
        await updateProfile(user, {displayName: name.trim() }).catch((error) => {
            toast.error(error.message);
        });
        const docref = doc(db, 'users', user.uid);
        await updateDoc(docref,{
            name: name.trim()
        })
        toast.success('Name Updated Successfully');
    }
}
