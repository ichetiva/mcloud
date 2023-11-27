import axios from 'axios'

const Search = (prompt , {setSearchStatus, setSearchData}) => {
    return (
        axios.get('https://ichetiva.ru/api/tracks/search', {
            q: prompt
          
            }, {headers: {'Access-Control-Allow-Origin': '*'}})
            .then(function (response) {           
                setSearchData(response)
                setSearchStatus(true)           
            })
            .catch(function (error) {
                console.log(error)
                
            })
    )
}

export default Search