import { useState } from 'react'

import css from './SearchPage.module.css'
import GetResult from './result'
import GetEmpty from './empty'


export const SearchPage = ({status, searchData, setMusic}) => {
    return(
        <div className={css.block}>
        {
        status
        ?<GetResult searchData={searchData} setMusic={setMusic}/>
        :<GetEmpty />
        }
        </div>
        
    )
}