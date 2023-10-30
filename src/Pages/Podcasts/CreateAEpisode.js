import React, { useState } from 'react'
import Input from '../../Components/Input'
import CustomFileInput from '../../Components/CustomFileInput'
import Button from '../../Components/Button';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { toast } from 'react-toastify';
import { auth, db, storage } from '../../Config/firebase';
import Navbar from '../../Components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import Loader from '../../Components/Loader';

const CreateAnEpisode = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [audio, setAudio] = useState();
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleEpisodeCreation = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(title && desc && audio && id){
      toast.success('Episode creation started');
      try{
        // Create a reference to displayImage
        const audioTimeStamp = Date.now();
        const audioRef = ref(storage, `podcast-episodes/${auth.currentUser.uid}/${audioTimeStamp}`);
        //uploading the display image
        await uploadBytes(audioRef, audio);

        // Create a downloadable URL for Audio file
        const downloadAudio = await getDownloadURL(audioRef);
        
        const episodeDetails = {
          title,
          description: desc,
          audio: downloadAudio,
          audioTimeStamp: audioTimeStamp.toString()
        }
        
        const docRef = await addDoc(collection(db, `podcasts`, id, `episodes`), episodeDetails);
        console.log(title , desc , audio, id)
        console.log(episodeDetails, docRef);
        toast.success('Episode created successfully');

        setTitle('');
        setDesc('');
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
      <h1>Create an episode</h1>
        <div className="form-wrapper">
          <Input setState={setTitle} state={title} type="text" placeholder='Enter Your Episode Titile...' />
          <Input setState={setDesc} state={desc} type="text" placeholder="Enter Your Episode Description..."/>
          <CustomFileInput id='displayImage' setState={setAudio} accept={'audio/*'} value="Select Audio File For Episode..."/>
          <Button disabled={loading} value={loading ? <Loader width={60} height={60}/> : 'Create Episode'} exeFunc={handleEpisodeCreation}/>
        </div>
    </form>
    </>
  )
}

export default CreateAnEpisode;
