import React from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const NewAudioPlayer = ({url}) => {
  return (

    <div className='auioPlayer-cont'>
      <AudioPlayer
        src={url}
        autoPlay
        customProgressBarSection={
      [
        RHAP_UI.CURRENT_TIME,
        RHAP_UI.PROGRESS_BAR,
        RHAP_UI.CURRENT_LEFT_TIME,
      ]
        }
      />
    </div>
  )
}

export default NewAudioPlayer;
