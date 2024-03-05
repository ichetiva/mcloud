import axios from 'axios'

const Search = (prompt , {setSearchStatus, setSearchData}) => {
    return (
        axios.get(`http://94.198.219.99:8000/api/tracks/search?q=${prompt}`  
        
        , {headers: {'Access-Control-Allow-Origin': '*'}})
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