import React, { useEffect } from 'react'
import Navbar from '../../Components/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../Config/firebase';
import { setPodcasts } from '../../ReduxToolkit/Slices/podcastSlice';
import Podcast from '../../Components/Podcast';

const Podcasts = () => {

  const podcasts = useSelector(state => state.podcasts.podcasts);
  const dispatch = useDispatch();

  useEffect(()=>{
    const unsubscribeSnapshot = onSnapshot(query(collection(db, 'podcasts')),
    querySnapShot=>{
        let tempArr = [];
        querySnapShot.forEach((doc)=>{
          tempArr.push({ id:doc.id,...doc.data() });
        });

        dispatch(setPodcasts(tempArr));
      },
      error=> {
        console.log(error);
      }
    );
    return ()=>{
      unsubscribeSnapshot();
    }
  },[dispatch]);

  

  return (
    <>
        <Navbar/>
        <h1>Podcast</h1>
        <div className="pod-wrapper">
          {podcasts.length > 0 ? 
          podcasts.map((podcast) => {
            return <Podcast key={podcast.id} id={podcast.id} displayImg={podcast.displayImage} title={podcast.title} />
          }):
          <p>No podcasts yet</p>}
        </div>
    </>
  )
}

export default Podcasts;
