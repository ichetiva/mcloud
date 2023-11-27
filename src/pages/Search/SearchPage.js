import { useState } from 'react'

import css from './SearchPage.module.css'
import GetResult from './result'
import GetEmpty from './empty'


export const SearchPage = ({status, searchData}) => {
    return(
        <div className={css.block}>
        {
        status
        ?<GetResult searchData={searchData}/>
        :<GetEmpty />
        }
        </div>
        
    )
}