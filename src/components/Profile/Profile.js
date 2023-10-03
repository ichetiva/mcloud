import css from './Profile.module.css'
import { ProfileOpen } from './ProfileOpen/ProfileOpen'
import { useState } from 'react'

export const Profile = () => {
const [OpenProfile, setOpenProfile] = useState(false)
    return(
        <div className={css.icon} onClick={() => setOpenProfile((prev) => !prev)}>
            {
            OpenProfile && <ProfileOpen />
            }
        </div>
        
    )
}