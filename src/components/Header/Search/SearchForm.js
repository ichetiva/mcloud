import { useState } from 'react'
import css from './SearchForm.module.css'

export const SearchBar = () => {
    const [search, setSearch] = useState('')
    return (
        <div className={css.container}>
            <div className={css.searchButton}>
                <div className={css.searchIcon} onClick={() => {alert(`Currently in wip ${search}`)}}>
                    <div className={css.icon}></div>
                </div>
            </div>
            <input className={css.input} autoFocus={true} placeholder='Music input' onChange={(e) => {setSearch(e.target.value)}}/>
            
        </div>
    )
}