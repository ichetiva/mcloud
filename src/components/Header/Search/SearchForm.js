import { useState } from 'react'
import css from './SearchForm.module.css'
import Search from '../../../api/GetSearch/Search'

export const SearchBar = ({setSearchStatus, setSearchData}) => {
    const [search, setSearch] = useState('')
    return (
        <div className={css.container}>
            <div className={css.searchButton}>
                <div className={css.searchIcon} onClick={() => 
                {
                   
                   
                   Search(search, {setSearchStatus, setSearchData})
                   
                }}>
                    <div className={css.icon}></div>
                </div>
            </div>
            <input className={css.input} autoFocus={true} placeholder='Music input' onChange={(e) => {setSearch(e.target.value)}}/>
            
        </div>
    )
}