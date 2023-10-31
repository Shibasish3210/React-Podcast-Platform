import React from 'react'
import { FaPlayCircle } from "react-icons/fa";
import Button from './Button';
import { FiEdit3 } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { setCurrEpisode } from '../ReduxToolkit/Slices/currPodcatSlice';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../Config/firebase';

const Episodes = ({ onExe, currPodcastEpisode}) => {
  const podcastDetails = useSelector(state=>state.podcast.podcast);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title, description, audio, audioTimeStamp } =  currPodcastEpisode;
  const triggerUpdation = ()=>{
    dispatch(setCurrEpisode({
      title,
      description,
      audio,
      audioTimeStamp,
      id: currPodcastEpisode.id
    }))
    console.log(currPodcastEpisode);
    navigate(`/podcasts/${id}/update-an-episode`);
  };
  return (
    <div className='episodes'>
      <div className="desc">
        <p>{title}</p>
        <p>{description}</p>
      </div>
      <div className="btn-wrapper">
        {auth?.currentUser?.uid === podcastDetails?.owner && <Button value={<FiEdit3/>} exeFunc={triggerUpdation}/>}
        <Button value={<FaPlayCircle/>} exeFunc={()=>onExe(audio)}/>
      </div>
    </div>
  )
}

export default Episodes
