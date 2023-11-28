import axios from 'axios'

const AllMusic = ({setData}) => {
    return (
        axios.get(`https://ichetiva.ru/api/tracks/search`  
        
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