import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar';
import Input from '../../Components/Input';
import CustomFileInput from '../../Components/CustomFileInput';
import Button from '../../Components/Button';
import Loader from '../../Components/Loader';
import { toast } from 'react-toastify';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../../Config/firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { doc, updateDoc } from 'firebase/firestore';

const EditAnEpisode = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [audio, setAudio] = useState();
  const [loading, setLoading] = useState(false);
  const episodeData = useSelector(state=>state?.podcast?.currEpisode)
  console.log(episodeData);
  useEffect(()=>{
    setTitle(episodeData?.title);
    setDesc(episodeData?.description);
  },[episodeData])

  const { id } = useParams();
  const navigate = useNavigate();

  const handleEpisodeUpdation = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(title || desc || audio){
      const episodeDetails = {
        title,
        description: desc,
      }
      toast.success('Episode creation started');
      try{
        if(audio){
          // Create a reference to displayImage
          const audioTimeStamp = Date.now();
          const audioRef = ref(storage, `podcast-episodes/${auth.currentUser.uid}/${audioTimeStamp}`);
          //uploading the display image
          await uploadBytes(audioRef, audio);
  
          // Create a downloadable URL for Audio file
          const downloadAudio = await getDownloadURL(audioRef);

          episodeDetails.audio = downloadAudio;
          episodeDetails.audioTimeStamp= audioTimeStamp.toString()
        }
        
        
        
        console.log(episodeData, id);
        const docRef = doc(db, `podcasts/${id}/episodes`,episodeData.id);
        await updateDoc(docRef, episodeDetails);
        
        const audioRef = ref(storage, `podcast-episodes/${auth.currentUser.uid}/${episodeData.audioTimeStamp}`);
            // Delete the file
        audio && deleteObject(audioRef);
        // console.log(episodeDetails, docRef);
        toast.success('Episode updated successfully');
        setAudio();
        navigate(`/podcasts/${id}`);
        setLoading(false);

      }catch(e){
        toast.error(e.message);
        console.log(e);
        setLoading(false);
      };
  }else{
    toast.error('please fill all the fields');
    setLoading(false);
  }

}
  return (
    <>
    <Navbar></Navbar>
    <form>
    <h1>Edit Episode</h1>
          <p style={{color: 'red', textAlign: 'center', marginBottom: '2rem'}}><strong>Caution : </strong>Only Update The Fields Necessery...</p>
        <div className="form-wrapper">
          <Input setState={setTitle} state={title} type="text" placeholder='Enter Your Episode Titile...' />
          <Input setState={setDesc} state={desc} type="text" placeholder="Enter Your Episode Description..."/>
          <CustomFileInput id='displayImage' setState={setAudio} accept={'audio/*'} value="Select Audio File For Episode..."/>
          <Button disabled={loading} value={loading ? <Loader width={60} height={60}/> : 'Update Episode'} exeFunc={handleEpisodeUpdation}/>
          <Button value='Go Back To Podcast' exeFunc={()=>navigate(`/podcasts/${id}`)}/>
        </div>
    </form>
    </>
  )
}

export default EditAnEpisode
