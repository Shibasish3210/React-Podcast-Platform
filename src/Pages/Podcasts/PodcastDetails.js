import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../../Config/firebase';
import Navbar from '../../Components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../Components/Button';
import Episodes from '../../Components/Episodes';
import NewAudioPlayer from '../../Components/NewAudioPlayer';
import { useDispatch } from 'react-redux';
import { setEpisodes, setPodcast } from '../../ReduxToolkit/Slices/currPodcatSlice';


const PodcastDetails = () => {
    const { id } = useParams();
    const [ currPodcast, setCurrPodcast ] = useState();
    const [ currPodcastEpisodes, setCurrPodcastEpisodes ] = useState([]);
    const [ playingAudio, setPlayingAudio ] = useState('');
    const navigate = useNavigate();

    const dispatch = useDispatch();
    
    useEffect(()=>{
        const getDocument = async () => {
          const docRef = doc(db, 'podcasts', id);
          const docSnap = await getDoc(docRef);
          if(docSnap.exists()){
              const data = docSnap.data();
              setCurrPodcast({id:id,...data});
              dispatch(setPodcast({
                title: data?.title,
                description: data?.description,
                displayTimeStamp: data?.displayTimeStamp,
                bannerTimeStamp: data?.bannerTimeStamp,
                displayImage: data?.displayImage,
                bannerImage: data?.bannerImage,
                owner: data?.owner
              }));
          }
        }
        if(id){ 
            getDocument();
        }
    },[id, dispatch]);

    useEffect(()=>{
        const unsubscribeSnapshot = onSnapshot(query(collection(db, 'podcasts', id, 'episodes')),
        querySnapShot=>{
            let tempArr = [];
            querySnapShot.forEach((doc)=>{
              tempArr.push({ id:doc.id,...doc.data() });
            });
            setCurrPodcastEpisodes(tempArr);
            dispatch(setEpisodes([...tempArr]));
          },
          error=> {
            console.log(error);
          }
        );
        return ()=>{
          unsubscribeSnapshot();
        }
      },[id, dispatch]);
    
      const playEpisode = (audio)=>{
        setPlayingAudio(audio);
      }

  return (
    <>
        <Navbar/>
        
        {currPodcast ?
            <div className='pod-det-wrapper'>
            <div className="heading">
                <h1>{currPodcast.title}</h1>
                {
                auth?.currentUser?.uid === currPodcast?.owner &&
                <div className='btn-wrapper'>
                <Button value='Edit Podcast' exeFunc={()=> navigate('edit-podcast')}/>
                <Button value='Create episode' exeFunc={()=> navigate('create-an-episode')}/>
                </div> 
                }
            </div>
            <img src={currPodcast.bannerImage} alt={currPodcast.title} />
            <p className='pod-desc'>{currPodcast.description}</p>
            </div>
            :
            <p>No Current Podcast</p>
        }

        {
            currPodcastEpisodes.length > 0?

            <div className='episode-cont'>
            <h1 style={{textAlign: 'left', width: '90vw', margin:'auto', marginBottom: '2rem'}}>Episodes</h1>
            {currPodcastEpisodes.map((currPodcastEpisode) =><Episodes currPodcastEpisode={currPodcastEpisode} key={currPodcastEpisode.id} onExe={(audio)=>playEpisode(audio)}/>) }
            </div>
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
