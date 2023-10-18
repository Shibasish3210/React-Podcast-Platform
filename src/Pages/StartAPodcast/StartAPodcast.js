import React, { useState } from 'react'
import Navbar from '../../Components/Navbar'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import CustomFileInput from '../../Components/CustomFileInput';
import { toast } from 'react-toastify';
import { auth, db, storage } from '../../Config/firebase';
import { addDoc, collection } from 'firebase/firestore';

const StartAPodcast = () => {

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBannerImage] = useState();


async function handlePodcastCreation() {
    console.log(displayImage, bannerImage);

   if(title && desc && displayImage && bannerImage){
    toast.success('Podcast creation started');
     try{
        // Create a reference to displayImage
        const displayImageRef = ref(storage, `podcsts/${auth.currentUser.uid}/${Date.now()}`);
        //uploading the display image
        await uploadBytes(displayImageRef, displayImage);

        //getting the display image downloadable link
        const downloadDP = await getDownloadURL(displayImageRef)

        // Create a reference to bannerImage 
        const bannerImageRef = ref(storage, `podcsts/${auth.currentUser.uid}/${Date.now()}`);
        //uploading the banner image
        await uploadBytes(bannerImageRef, bannerImage);

        //getting the banner image downloadable link
        const downloadBanner = await getDownloadURL(bannerImageRef);

        const podcastDetails = {
          title: title,
          description: desc,
          displayImage: downloadDP,
          bannerImage: downloadBanner,
          owner: auth.currentUser.uid
        }

        const docRef = await addDoc(collection(db, 'podcasts'), podcastDetails);

        toast.success('Podcast created successfully');
        setTitle('');
        setDesc('');
        setDisplayImage();
        setBannerImage();
    }catch(e){
      toast.error(e.message);
      console.log(e);
    }
  }else{
    toast.error('please fill all the fields');
  }

    
}


  return (
    <>
        <Navbar/>
        <h1>Start A Podcast</h1>
        <div className="form-wrapper">
          <Input setState={setTitle} state={title} type="text" placeholder='Enter Your Full Name' />
          <Input setState={setDesc} state={desc} type="text" placeholder="Enter Your Email Address"/>
          <CustomFileInput id='displayImage' setState={setDisplayImage} accept={'image/*'} value="Select Display Image"/>
          <CustomFileInput id='bannerImage' setState={setBannerImage} accept={'image/*'} value="Select Banner Image"/>
          <Button value='Create Podcast' exeFunc={handlePodcastCreation}/>
        </div>
    </>
  )
}

export default StartAPodcast
