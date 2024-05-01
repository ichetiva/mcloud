import axios from 'axios';
const GetPlaylistsById = (id, {setPlaylistData}) => {
if(id){
    return (
    axios.get(`http://94.198.219.99:8000/api/playlists/${id}`,
    {
      headers: 
      {
        "Authorization": `Bearer ${localStorage.getItem('Token')}`
      }
    })
      .then(function (response) {
        setPlaylistData(response)
      })
      .catch(function (error) {
            console.log(error)
      }));
}
  
  
};

export default GetPlaylistsById