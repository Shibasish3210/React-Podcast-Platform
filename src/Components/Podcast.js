import React from 'react';
import { Link } from 'react-router-dom';
import { FaPodcast } from "react-icons/fa6";

const Podcast = ({ displayImg,title,id }) => {
  return (
    <Link to={`/podcasts/${id}`}>
        <div className="podcastCard">
            <img src={displayImg} alt={title} />
            <div className="podcastCard-info">
                <p>{title}</p>
                <FaPodcast/>
            </div>
        </div>
    </Link>
  )
}

export default Podcast;
