import React, { useState } from 'react'
import Navbar from '../../Components/Navbar'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import CustomFileInput from '../../Components/CustomFileInput';
import { toast } from 'react-toastify';
import { auth, db, storage } from '../../Config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Components/Loader';

const StartAPodcast = () => {

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBannerImage] = useState();
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();


async function handlePodcastCreation() {
   setLoading(true)
   if(title && desc && displayImage && bannerImage){
    toast.success('Podcast creation started');
     try{
        // Create a reference to displayImage
        const displayTimeStamp = Date.now();
        const displayImageRef = ref(storage, `podcasts/${auth.currentUser.uid}/${displayTimeStamp}`);
        //uploading the display image
        await uploadBytes(displayImageRef, displayImage);

        //getting the display image downloadable link
        const downloadDP = await getDownloadURL(displayImageRef)

        // Create a reference to bannerImage 
        const bannerTimeStamp = Date.now();
        const bannerImageRef = ref(storage, `podcasts/${auth.currentUser.uid}/${bannerTimeStamp}`);
        //uploading the banner image
        await uploadBytes(bannerImageRef, bannerImage);

        //getting the banner image downloadable link
        const downloadBanner = await getDownloadURL(bannerImageRef);
        const podcastDetails = {
          title: title,
          description: desc,
          displayTimeStamp: displayTimeStamp.toString(),
          displayImage: downloadDP,
          bannerTimeStamp : bannerTimeStamp.toString(),
          bannerImage: downloadBanner,
          owner: auth.currentUser.uid
        }
        
        const docRef = await addDoc(collection(db, 'podcasts'), podcastDetails);
        
        setTitle('');
        setDesc('');
        setDisplayImage();
        setBannerImage();
        toast.success('Podcast created successfully');
        setLoading(false);
        navigate(`/podcasts/${docRef.id}`)
        
      }catch(e){
        toast.error(e.message);
        console.log(e);
        setLoading(false);
    }
  }else{
    toast.error('Please fill all the fields');
    setLoading(false);
  }

}


  return (
    <>
        <Navbar/>
        <h1>Start A Podcast</h1>
        <div className="form-wrapper">
          <Input setState={setTitle} state={title} type="text" placeholder='Enter Your Podcast Title...' />
          <Input setState={setDesc} state={desc} type="text" placeholder="Enter Your Podcast Description..."/>
          <CustomFileInput id='displayImage' setState={setDisplayImage} accept={'image/*'} value="Select Display Image..."/>
          <CustomFileInput id='bannerImage' setState={setBannerImage} accept={'image/*'} value="Select Banner Image..."/>
          <Button disabled={loading} value={loading ? <Loader width={60} height={60}/> : 'Create Podcast'} exeFunc={handlePodcastCreation}/>
        </div>
    </>
  )
}

export default StartAPodcast
