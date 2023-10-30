import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import { useDispatch } from 'react-redux';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../Config/firebase';
import Podcast from '../../Components/Podcast';
import Input from '../../Components/Input';

const Podcasts = () => {

  const [podcasts, setPodcasts] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredPodcast, setFilteredPodcast] = useState([]);
  const dispatch = useDispatch();

  useEffect(()=>{
    const unsubscribeSnapshot = onSnapshot(query(collection(db, 'podcasts')),
    querySnapShot=>{
        let tempArr = [];
        querySnapShot.forEach((doc)=>{
          tempArr.push({ id:doc.id,...doc.data() });
        });
        setPodcasts(tempArr);
      },
      error=> {
        console.log(error);
      }
    );
    return ()=>{
      unsubscribeSnapshot();
    }
  },[dispatch]);

  useEffect(()=>{
    setFilteredPodcast(podcasts.filter(podcast=>{
      return podcast.title.toLowerCase().includes(search.trim().toLowerCase());
    })); 
  },[search,podcasts])

  

  return (
    <>
        <Navbar/>
        <h1>Podcast</h1>
        <div className="pod-wrapper">
        <Input setState={setSearch} state={search} type="text" placeholder='Enter Podcast Name To Search...'/>
          {podcasts.length > 0 ? 
          <>
            {
              filteredPodcast.length > 0 ?
              filteredPodcast?.map((podcast) => {
                return <Podcast key={podcast.id} id={podcast.id} displayImg={podcast.displayImage} title={podcast.title} />
              }):
              <p style={{width : '100%', textAlign: 'center' , marginTop: '4rem'}}>No such podcasts found !...</p>

            }
          </>
          :
          <p style={{width : '100%', textAlign: 'center' , marginTop: '4rem'}}>No podcasts yet !...</p>}
        </div>
    </>
  )
}

export default Podcasts;
