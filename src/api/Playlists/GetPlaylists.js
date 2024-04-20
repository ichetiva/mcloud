import axios from 'axios';
const GetPlaylists = (user, {setPlaylists}) => {
const userfound = parseInt(user.data.id)
console.log(`http://94.198.219.99:8000/api/playlists/user/${userfound}>`)
  return (
    axios.get(`http://94.198.219.99:8000/api/playlists/user/${userfound}`
    , {user_id: userfound}
    , {
      headers: 
      {"Authorization": `Bearer ${localStorage.getItem('Token')}`}
    })
      .then(function (response) {
        setPlaylists(response)
      })
      .catch(function (error) {
            console.log(error)
      }));
  
};

export default GetPlaylists