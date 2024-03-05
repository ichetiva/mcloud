import axios from 'axios'

const AllMusic = ({setData}) => {
    return (
        axios.get(`http://94.198.219.99:8000/api/tracks/search`  
        
        , {headers: {'Access-Control-Allow-Origin': '*'}})
            .then(function (response) { 
                setData(response)
            })
            .catch(function (error) {
                console.log(error)
                
            })
    )
}

export default AllMusic