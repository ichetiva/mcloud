import css from './SearchForm.module.css'

export const SearchBar = () => {
    return (
        <div className={css.container}>
            <input className={css.input} placeholder='Music input'/>
            <div className={css.searchbutton}></div>
        </div>
    )
}