import * as fs from 'fs';
import './plyr.css'
import Plyr from 'plyr'
import file from './config.json';
import './player.module.css'

export const Player = () => {
    const data = JSON.stringify(file)
    
   
    const player = new Plyr('#player', data)
    window.player = player
    
    return(
        <div className='container'>
            <audio id="player" crossorigin playsinline>
            <source src="" type="audio/mp3" />
            <source src="" type="audio/ogg" />
            </audio>
        </div>
    )
}

