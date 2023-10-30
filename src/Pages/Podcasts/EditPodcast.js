import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { auth, db, storage } from '../../Config/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import CustomFileInput from '../../Components/CustomFileInput';
import Input from '../../Components/Input';
import Loader from '../../Components/Loader';
import Button from '../../Components/Button';
import Navbar from '../../Components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EditPodcast = ({setIsEditingEpisodes}) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [displayImage, setDisplayImage] = useState();
    const [bannerImage, setBannerImage] = useState();
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const podCastData = useSelector(state => state.podcast.podcast);

    useEffect(() =>{
        setTitle(podCastData?.title);
        setDesc(podCastData?.description);
    },[podCastData]);

async function handlePodcastUpdation() {
    setLoading(true)
    if(title || desc || displayImage || bannerImage){
    toast.success('Podcast updation started');
        
    const podcastDetails = {
    title: title,
    description: desc,
    }
        
        try{
            if(displayImage){
                // Create a reference to displayImage
                const displayTimeStamp = Date.now();
                const displayImageRef = ref(storage, `podcasts/${auth.currentUser.uid}/${displayTimeStamp}`);
                //uploading the display image
                await uploadBytes(displayImageRef, displayImage);
        
                //getting the display image downloadable link
                const downloadDP = await getDownloadURL(displayImageRef)
                podcastDetails.displayImage = downloadDP;
                podcastDetails.displayTimeStamp = displayTimeStamp.toString();
            }
            if(bannerImage){
                // Create a reference to bannerImage 
                const bannerTimeStamp = Date.now();
                const bannerImageRef = ref(storage, `podcasts/${auth.currentUser.uid}/${bannerTimeStamp}`);
                //uploading the banner image
                await uploadBytes(bannerImageRef, bannerImage);

                //getting the banner image downloadable link
                const downloadBanner = await getDownloadURL(bannerImageRef);
                podcastDetails.bannerImage = downloadBanner;
                podcastDetails.bannerTimeStamp = bannerTimeStamp.toString();
            }

            //   await addDoc(collection(db, 'podcasts'), podcastDetails);
            const docRef = doc(db, 'podcasts', id);
            await updateDoc(docRef, podcastDetails);

            // Create a reference to the file to delete
            const displayRef = ref(storage, `podcasts/${auth.currentUser.uid}/${podCastData.bannerTimeStamp}`);
            const bannerRef = ref(storage, `podcasts/${auth.currentUser.uid}/${podCastData.displayTimeStamp}`);

            // Delete the file
            displayImage && deleteObject(displayRef);
            bannerImage && deleteObject(bannerRef);
            
            toast.success('Podcast updated successfully');
            setLoading(false);
            setDisplayImage();
            setBannerImage();
            navigate(`/podcasts/${id}`)

        }catch(e){
            toast.error(e.message);
            console.log(e);
            setLoading(false);
        }
    }
  }
  
  
    return (
      <>
          <Navbar/>
          <h1>Edit Podcast</h1>
          <p style={{color: 'red', textAlign: 'center', marginBottom: '2rem'}}><strong>Caution : </strong>Only Update The Fields Necessery...</p>
          <div className="form-wrapper">
            <Input setState={setTitle} state={title} type="text" placeholder='Enter Your Podcast Title...' />
            <Input setState={setDesc} state={desc} type="text" placeholder="Enter Your Podcast Description..."/>
            <CustomFileInput id='displayImage' setState={setDisplayImage} accept={'image/*'} value="Select Display Image..."/>
            <CustomFileInput id='bannerImage' setState={setBannerImage} accept={'image/*'} value="Select Banner Image..."/>
            <Button disabled={loading} value={loading ? <Loader width={60} height={60}/> : 'Update Podcast'} exeFunc={handlePodcastUpdation}/>
            <Button value='Go Back To Podcast' exeFunc={()=>navigate(`/podcasts/${id}`)}/>
          </div>
      </>
    )
}

export default EditPodcast
