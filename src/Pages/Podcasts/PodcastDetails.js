import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { auth, db } from '../../Config/firebase';
import Navbar from '../../Components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../Components/Button';
import Episodes from '../../Components/Episodes';
import NewAudioPlayer from '../../Components/NewAudioPlayer';
// import { setPodcast } from '../../ReduxToolkit/Slices/currPodcatSlice';

const PodcastDetails = () => {
    const { id } = useParams();
    const [ currPodcast, setCurrPodcast ] = useState();
    const [ currPodcastEpisodes, setCurrPodcastEpisodes ] = useState([]);
    const [ playingAudio, setPlayingAudio ] = useState('');
    const navigate = useNavigate();
    
    useEffect(()=>{
        const getDocument = async () => {
          const docRef = doc(db, 'podcasts', id);
          const docSnap = await getDoc(docRef);
          if(docSnap.exists()){
              const data = docSnap.data();
              setCurrPodcast({id:id,...data});
          }
        }
        if(id){ 
            getDocument();
        }
    },[id]);

    

    useEffect(()=>{
        const unsubscribeSnapshot = onSnapshot(query(collection(db, 'podcasts', id, 'episodes')),
        querySnapShot=>{
            let tempArr = [];
            querySnapShot.forEach((doc)=>{
              tempArr.push({ id:doc.id,...doc.data() });
            });
            setCurrPodcastEpisodes(tempArr);
          },
          error=> {
            console.log(error);
          }
        );
        return ()=>{
          unsubscribeSnapshot();
        }
      },[id]);
    
      const playEpisode = (audio)=>{
        console.log('playing ' + audio);
        setPlayingAudio(audio);
      }

      console.log(currPodcastEpisodes)
  return (
    <>
        <Navbar/>
        
        {currPodcast ?
            <div className='pod-det-wrapper'>
            <div className="heading">
                <h1>{currPodcast.title}</h1>
                {auth.currentUser.uid === currPodcast.owner && <Button value='Create episode' exeFunc={()=> navigate('create-an-episode')}/>}
            </div>
            <img src={currPodcast.bannerImage} alt={currPodcast.title} />
            <p className='pod-desc'>{currPodcast.description}</p>
            </div>
            :
            <p>No Current Podcast</p>
        }

        {
            currPodcastEpisodes.length > 0?

            <>
            <h1 style={{textAlign: 'left', width: '90vw', margin:'auto', marginBottom: '2rem'}}>Episodes</h1>
            {currPodcastEpisodes.map((currPodcastEpisode) =><Episodes key={currPodcastEpisode.id} title={currPodcastEpisode.title} desc={currPodcastEpisode.description} audio={currPodcastEpisode.audio} onExe={(audio)=>playEpisode(audio)}/>) }
            </>
            :
            <>
            </>
        }

        {
            playingAudio && <NewAudioPlayer url={playingAudio}/>
        }
    </>
  )
}

export default PodcastDetails
